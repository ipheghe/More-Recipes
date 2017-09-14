import express from 'express';
import authorize from '../../jsontoken';
import votesController from '../controllers/votes';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

//API route for registered users to favorite recipes
router.post('/api/recipes/:id/votes', authorize.verifyUser, validUser, recipeExists, votesController.upvote, votesController.downvote);

export default router;