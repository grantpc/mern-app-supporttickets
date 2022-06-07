const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

exports.protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token, set user in request
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      console.log(err.message);
      res.status(401);
      throw new Error('Not authorized to access this route');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }
});
