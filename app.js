const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const viewRouter = require("./route/viewRoute");
const toursRouter = require("./route/tourRoutes");
const usersRouter = require("./route/userRoutes");
const reviewRouter = require("./route/reviewRoute");

const app = express();

// ✅ 1) CORS setup (must come before routes)
app.use(
  cors({
    origin: "http://127.0.0.1:3000", // Change to your frontend origin if different
    credentials: true, // Allow cookies
  })
);

// ✅ 2) View engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// ✅ 3) Serve static files
app.use(express.static(path.join(__dirname, "starter/public")));

// ✅ 4) Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for development
  })
);

// ✅ 5) Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ 6) Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// ✅ 7) Body parser and cookie parser
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// ✅ 8) Data sanitization
app.use(mongoSanitize()); // Against NoSQL injection
app.use(xss()); // Against XSS

// ✅ 9) Prevent parameter pollution
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

// ✅ 10) Mount routers
app.use("/", viewRouter);
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/reviews", reviewRouter);

// ✅ 11) Handle unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ✅ 12) Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
