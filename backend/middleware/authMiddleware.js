const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token);

      if (!token) {
        console.log('No token provided');
        res.status(401);
        throw new Error('Not authorized, no token');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);

      req.user = await User.findById(decoded.id).select('-password');
      console.log('Authenticated user:', req.user);

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.error('Token error:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    console.log('No token provided in headers');
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
