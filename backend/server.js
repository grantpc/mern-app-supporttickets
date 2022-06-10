const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes files
const users = require('./routes/userRoutes');
const tickets = require('./routes/ticketRoutes');

// Mounting routes
app.use('/api/v1/users', users);
app.use('/api/v1/tickets', tickets);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Load the index.html file in that build folder
  app.get('*', (req, res) => {
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html');
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' });
  });
}

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
