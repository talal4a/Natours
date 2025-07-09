const express = require('express');
const viewsController = require('../controller/viewsController');
const authController = require('../controller/authController');

const router = express.Router();

// Apply isLoggedIn middleware to set res.locals.user
router.use(authController.isLoggedIn);

// Simple logging middleware for debugging
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Public routes
router.get('/', viewsController.getOverView);
router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);

// Protected routes (require authentication)
router.get('/me', authController.protect, viewsController.getAccount);

// Update user data
router.post('/submit-user-data', authController.protect, viewsController.updateUserData);

// Handle 404 for view routes
router.all('*', (req, res, next) => {
  res.status(404).render('error', {
    title: 'Page not found',
    msg: 'The page you are looking for does not exist.',
  });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Error in route handler:', err);
  res.status(500).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
});

module.exports = router;
