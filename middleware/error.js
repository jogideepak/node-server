/**
 * Error handler that reads from mongoose
 */
const ErrorResponse = require('../utils/errorResponse');
const colors = require('colors');

const errorHandler = (err, req, res, next) => {
  let error = { ...err }; // pulls a copy of err out of response
  console.log(err.stack.red);

  // bad ObjectId [Cast Error]
  if (err.name === 'Cast Error') {
    const message = `Resource not found (bad ObjectId)`;
    error = new ErrorResponse(message, 404);
  }

  // duplicate key [11000]
  if (err.code === 11000) {
    const message = `Invalid duplicate values`;
    error = new ErrorResponse(message, 400);
  }

  // Validation Error [model specific]
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || `Server error`,
  });
};

module.exports = errorHandler;
