import express from 'express';
import authorize from '../middlewares/requireAuth';
import { users } from '../controllers';
import {
  validateUserFields,
  validateUserSigninFeild,
  validatePasswordField,
  validUser
} from '../middlewares/userValidation';

const router = express.Router();

// API route for users to create accounts
router.post('/api/v1/user/signup', validateUserFields, users.signup);

// API route for users to login to the application
router.post('/api/v1/user/signin', validateUserSigninFeild, users.signin);

// API route to check if user exists
router.get('/api/v1/user/:username', users.getUserDetails);

// API route to update user record
router.put('/api/v1/user', authorize.verifyUser, validUser, users.updateUserRecord);

// API route to change password
router.put(
  '/api/v1/user/changePassword/user',
  authorize.verifyUser,
  validUser,
  validatePasswordField,
  users.changePassword
);

// Password reset request route (generate/send token)
router.post('/api/v1/user/forgotPassword', users.forgotPassword);

// Password reset route (change password using token)
router.post('/api/v1/user/reset-password/:token', users.verifyTokenPassword);

export default router;
