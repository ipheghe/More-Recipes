import express from 'express';
import authorize from '../middlewares/requireAuth';
import { votes } from '../controllers';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

// API route for registered users to favorite recipes
router.put(
  '/api/v1/recipe/:id/vote',
  authorize.verifyUser,
  validUser,
  recipeExists,
  votes.upvoteRecipe,
  votes.downvoteRecipe
);

export default router;
