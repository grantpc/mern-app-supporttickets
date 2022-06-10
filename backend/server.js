const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

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

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
