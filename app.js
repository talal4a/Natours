const express = require("express");
const app = express();
const globalErrorHandler = require("./controller/errorController.js");
const AppError = require("./utils/appError");
const morgan = require("morgan");
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(`${__dirname}/public`));
const toursRouter = require("./route/tourRoutes");
const usersRouter = require("./route/userRoutes");
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);
app.all("*", (req, res, next) => {
next(new AppError(`Can't find the ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
