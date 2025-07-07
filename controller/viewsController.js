const Tour = require("../model/tourModel");
const catchAsync = require("../utils/catchAsync");
exports.getOverView = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render("overview", {
    tours,
  });
});
exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "The Forest Hiker Tour",
  });
};
