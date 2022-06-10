const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// @desc    Get notes for a ticket
// @route   GET api/v1/tickets/:ticketId/notes
// @access  Private
exports.getNotes = asyncHandler(async (req, res) => {
  // Get user using ID and JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc    Create ticket note
// @route   POST api/v1/tickets/:ticketId/notes
// @access  Private
exports.createNote = asyncHandler(async (req, res) => {
  // Get user using ID and JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const note = await Note.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    user: req.user.id,
    isStaff: false,
  });

  res.status(200).json(note);
});
