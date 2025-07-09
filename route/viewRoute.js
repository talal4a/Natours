const express = require('express');
const viewsController = require('../controller/viewsController');
const authController = require('../controller/authController');
const router = express.Router();

router.use(authController.isLoggedIn);

// Routes
router.get('/', viewsController.getOverView);
router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.post('/submit-user-data', viewsController.updateUserData);

module.exports = router;
