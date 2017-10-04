import express from 'express';
import cors from 'cors';
import authorize from '../../jsontoken';
import usersController from '../controllers/users';
import votesController from '../controllers/votes';
import { validateUserFields, validUser } from '../middlewares/userValidation';

const router = express.Router();
const corsOptions = {
  origin: 'https://more-recipes-ovie.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//API route for users to create accounts
router.post('/api/v1/users/signup', validateUserFields, usersController.signup);

//API route for users to login to the application
router.post('/api/v1/users/signin', usersController.signin);

//API route to check if user exists
router.get('/api/v1/users/:username', usersController.userExists);

export default router;
