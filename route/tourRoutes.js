const express = require("express");
const router = express.Router();
const tourController = require("../controller/tourController");
// router.param("id", tourController.checkID);
router
  .route("/top-5-cheap")
  .get(tourController.aliasToptours, tourController.getAllTours);
  router.route("/tour-stats").get(tourController.getTourStats);
  router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
