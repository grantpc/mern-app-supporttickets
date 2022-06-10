const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/auth');

const {
  getTickets,
  createTicket,
  getSingleTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');

// Re-route into note router
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

router
  .route('/')
  .get(protectRoute, getTickets)
  .post(protectRoute, createTicket);

router
  .route('/:id')
  .get(protectRoute, getSingleTicket)
  .delete(protectRoute, deleteTicket)
  .put(protectRoute, updateTicket);

module.exports = router;
