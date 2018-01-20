import express from 'express';
import authorize from '../middlewares/requireAuth';
import { users } from '../controllers';
import {
  validateUserFields,
  validateUserSigninFeild,
  validatePasswordField,
  validUser
} from '../middlewares/userValidation';

const usersController = users;
const router = express.Router();

// API route for users to create accounts
router.post('/api/v1/user/signup', validateUserFields, usersController.signup);

// API route for users to login to the application
router.post(
  '/api/v1/user/signin',
  validateUserSigninFeild,
  usersController.signin
);

// API route to check if user exists
router.get('/api/v1/user/:username', usersController.getUserDetails);

// API route to update user record
router.put(
  '/api/v1/user',
  authorize.verifyUser,
  validUser,
  usersController.updateUserRecord
);

// API route to change password
router.put(
  '/api/v1/user/changePassword',
  authorize.verifyUser,
  validUser,
  validatePasswordField,
  usersController.changePassword
);

// Password reset request route (generate/send token)
router.post('/api/v1/user/forgotPassword', usersController.forgotPassword);

// Password reset route (change password using token)
router.post(
  '/api/v1/user/reset-password/:token',
  usersController.verifyTokenPassword
);

export default router;
