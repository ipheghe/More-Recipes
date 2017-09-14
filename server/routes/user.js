import express from 'express';
import authorize from '../../jsontoken';
import usersController from '../controllers/users';
import votesController from '../controllers/votes';
import { validateUserFields, validUser } from '../middlewares/userValidation';

const router = express.Router();

router.get('/api', (req, res) => res.status(200).send({
  'error': false, 'message': 'Welcome to the More Recipes!',
}));

//API route for users to create accounts
router.post('/api/users/signup', validateUserFields, usersController.signup);

//API route for users to login to the application
router.post('/api/users/signin', usersController.signin);

export default router;
