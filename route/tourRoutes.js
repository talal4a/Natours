const express = require("express");
const router = express.Router();
const tourController = require("../controller/tourController");
const authController = require("../controller/authController");
const reviewController = require("../controller/reviewController");
// router.param("id", tourController.checkID);
router
  .route("/top-5-cheap")
  .get(tourController.aliasToptours, tourController.getAllTours);
router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);
router
  .route("/")
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );
router
  .route("/:tourId/review")
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview
  );
module.exports = router;
