import express from 'express';
import * as userController from '../controller/userController.js';
import * as authController from '../controller/authController.js';
import { upload } from '../utils/multerConfig.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/logout', userController.logout);

// Protect all routes after this middleware
router.use(authController.protect);

// Protected routes (authentication required)
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', upload.single('photo'), userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Admin-only routes
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
