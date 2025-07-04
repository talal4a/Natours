const AppError = require("../utils/appError");

// Define all helper functions first
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400); // Add missing parameters
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["" '])(\\?.)*?\1/)[0];
  const message = `Duplicate field value ${value}.Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handleJWTError = (err) =>
  new AppError("Invalid token.Please enter valid token");
const handleJWTExpiredError = (err) =>
  new AppError("You have  expired.Please login again", 401);
const sendErrorDev = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(`💥Error :`, err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

// Then export the main error handler
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(res, err);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);
    sendErrorProd(res, error);
  }
};
