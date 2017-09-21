import express from 'express';
import authorize from '../../jsontoken';
import usersController from '../controllers/users';
import votesController from '../controllers/votes';
import { validateUserFields, validUser } from '../middlewares/userValidation';

const router = express.Router();

//API route for users to create accounts
router.post('/api/v1/users/signup', validateUserFields, usersController.signup);

//API route for users to login to the application
router.post('/api/v1/users/signin', usersController.signin);

export default router;
