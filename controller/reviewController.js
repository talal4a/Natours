const Review = require("../model/reviewModal");
const catchAsync = require("../utils/catchAsync");
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: "sucess",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
exports.createReview = catchAsync(async (req, res, next) => {
  const newReviews = await Review.create(req.body);
  res.status(200).json({
    status: "sucess",
    data: {
      review: newReviews,
    },
  });
});
