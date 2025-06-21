const { constants } = require("http2");
const mongoose = require("mongoose");

const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = constants;

const errorHandler = (err, req, res, next) => {
  // Default error structure
  let error = {
    message: err.message || "Internal Server Error",
    statusCode: err.statusCode || HTTP_STATUS_INTERNAL_SERVER_ERROR,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    error.message = "Validation failed";
    error.statusCode = HTTP_STATUS_BAD_REQUEST;
    error.errors = Object.values(err.errors).map((el) => ({
      field: el.path,
      message: el.message,
    }));
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    error.message = "Duplicate field value entered";
    error.statusCode = HTTP_STATUS_CONFLICT;
    error.fields = Object.keys(err.keyValue);
  }

  // Mongoose CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    error.message = `Invalid ${err.path}: ${err.value}`;
    error.statusCode = HTTP_STATUS_BAD_REQUEST;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error.message = "Invalid token";
    error.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }

  if (err.name === "TokenExpiredError") {
    error.message = "Token expired";
    error.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }

  // Custom error classes
  if (err.name === "UnauthorizedError") {
    error.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  // Send response
  res.status(error.statusCode).json({
    success: false,
    error: error.message,
    errors: error.errors,
    fields: error.fields,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(message, HTTP_STATUS_BAD_REQUEST);
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(message, HTTP_STATUS_NOT_FOUND);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, HTTP_STATUS_UNAUTHORIZED);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(message, HTTP_STATUS_FORBIDDEN);
  }
}

class ConflictError extends ApiError {
  constructor(message = "Conflict") {
    super(message, HTTP_STATUS_CONFLICT);
  }
}

module.exports = {
  errorHandler,
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
};
