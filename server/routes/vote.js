import express from 'express';
import authorize from '../middlewares/requireAuth';
import votesController from '../controllers/votes';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

// API route for registered users to favorite recipes
router.put(
  '/api/v1/recipes/:id/votes',
  authorize.verifyUser,
  validUser,
  recipeExists,
  votesController.upvoteRecipe,
  votesController.downvoteRecipe);

export default router;
