import express from 'express';
import authorize from '../../jsontoken';
import usersController from '../controllers/users';
import { validateUserFields, validUser } from '../middlewares/userValidation';

const router = express.Router();

//API route for users to create accounts
router.post('/api/v1/users/signup', validateUserFields, usersController.signup);

//API route for users to login to the application
router.post('/api/v1/users/signin', usersController.signin);

//API route to check if user exists
router.get('/api/v1/users/:username', usersController.userExists);

//API route to update user record
router.put('/api/v1/users/:id', authorize.verifyUser, validUser, usersController.updateUserRecord);

export default router;
