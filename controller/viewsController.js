const Tour = require("../model/tourModel");
const catchAsync = require("../utils/catchAsync");
exports.getOverView = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render("overview", {
    tours,
  });
});
exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({
    slug: req.params.slug,
  }).populate({
    path: "reviews",
    feilds: "review rating user",
  });
  res.status(200).render("tour", {
    title: ` ${tour.name} Tour`,
    tour,
  });
});
