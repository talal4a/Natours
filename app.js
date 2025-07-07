const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const reviewRouter = require("./route/reviewRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const app = express();
const viewRouter = require("./route/viewsRoute");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Change this line
// First serve static files
app.use(express.static(path.join(__dirname, "starter/public")));

// Then apply Helmet (this order matters)
// Try this more permissive configuration
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP entirely for testing
  })
);

// 2) Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// 3) Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
// 4) Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
// 5) Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// 6) Data sanitization against XSS
app.use(xss());
// 7) Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);
// 8) Serving static files

// 9) Routes
const toursRouter = require("./route/tourRoutes");
const usersRouter = require("./route/userRoutes");
app.use("/", viewRouter);
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/reviews", reviewRouter);

// 10) Handling unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// 11) Global error handling middleware
app.use(globalErrorHandler);
module.exports = app;
