const express = require("express");
const router = express.Router();
const tourController = require("../controller/tourController");
const authController = require("../controller/authController");
const reviewRouter = require("../route/reviewRoute");
router.use("/:tourId/reviews", reviewRouter);
router
  .route("/top-5-cheap")
  .get(tourController.aliasToptours, tourController.getAllTours);
router.route("/tour-stats").get(tourController.getTourStats);
router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );
router
  .route("/tours-within/:distance/center/:latlng/:unit")
  .get(tourController.getToursWithin);
router
  .route("/distances/center/:latlng/:unit")
  .get(tourController.getDistances);
router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );
module.exports = router;
