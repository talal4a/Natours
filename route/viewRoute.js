const express = require("express");
const viewsController = require("../controller/viewsController");
const router = express.Router();

router.get("/", viewsController.getOverView);
router.get("/overview", viewsController.getOverView);
router.get("/tour", viewsController.getTour);

module.exports = router;
