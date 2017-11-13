import express from 'express';
import authorize from '../middlewares/requireAuth';
import usersController from '../controllers/users';
import {
  validateUserFields,
  validUser
} from '../middlewares/userValidation';

const router = express.Router();

// API route for users to create accounts
router.post('/api/v1/users/signup', validateUserFields, usersController.signup);

// API route for users to login to the application
router.post('/api/v1/users/signin', usersController.signin);

// API route to check if user exists
router.get('/api/v1/users/:username', usersController.getUserDetails);

// API route to update user record
router.put('/api/v1/users/:id', authorize.verifyUser, validUser, usersController.updateUserRecord);

// API route to change password
router.put(
  '/api/v1/users/changePassword/:id',
  authorize.verifyUser,
  validUser,
  usersController.changePassword
);

// Password reset request route (generate/send token)
router.post('/api/v1/users/forgotPassword', usersController.forgotPassword);

// Password reset route (change password using token)
router.post('/api/v1/users/reset-password/:token', usersController.verifyTokenPassword);

export default router;
