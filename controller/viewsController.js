const Tour = require("../model/tourModel");
const catchAsync = require("../utils/catchAsync");
exports.getOverView = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render("overview", {
    title: "All Tours",
    user: res.locals.user,
    tours,
  });
});
exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    select: "review rating user",
  });
  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    user: res.locals.user,
    tour,
  });
});
exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render("login", {
    title: "Login to your account",
    user: res.locals.user || null,
  });
});
