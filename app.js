const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});
const toursRouter = require("./route/tourRoutes");
const usersRouter = require("./route/userRoutes");
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);
module.exports = app;
