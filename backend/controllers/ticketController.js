const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc    Get user tickets
// @route   GET api/v1/tickets
// @access  Private
exports.getTickets = asyncHandler(async (req, res) => {
  // Get user using ID and JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc    Get single ticket
// @route   GET api/v1/tickets/:id
// @access  Private
exports.getSingleTicket = asyncHandler(async (req, res) => {
  // Get user using ID and JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Make sure that the logged in user can only see their tickets
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to view this ticket');
  }

  res.status(200).json(ticket);
});

// @desc    Create new ticket
// @route   POST api/v1/tickets
// @access  Private
exports.createTicket = asyncHandler(async (req, res) => {
  // Grab body data
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(404);
    throw new Error('Please add a product and a description');
  }

  // Get user using ID and JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });
  res.status(201).json(ticket);
});

// @desc    Delete ticket
// @route   DELETE api/v1/tickets/:id
// @access  Private
exports.deleteTicket = asyncHandler(async (req, res) => {
  // Get user using ID and JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Make sure that the logged in user can only see their tickets
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to view this ticket');
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @desc    Update ticket
// @route   PUT api/v1/tickets/:id
// @access  Private
exports.updateTicket = asyncHandler(async (req, res) => {
  // Get user using ID and JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Make sure that the logged in user can only see their tickets
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to view this ticket');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedTicket);
});
