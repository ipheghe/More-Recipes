import express from 'express';
import authorize from '../middlewares/requireAuth';
import { reviews } from '../controllers';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';
import reviewValidation from '../middlewares/reviewValidation';
import reviewNotification from '../middlewares/reviewNotification';

const reviewsController = reviews;
const router = express.Router();

// API route for users to post review for a recipe
router.post(
  '/api/v1/recipe/:id/review',
  authorize.verifyUser,
  validUser,
  recipeExists,
  reviewValidation,
  reviewsController.postReview,
  reviewNotification
);

// API route for users to retrieve all reviews
router.get(
  '/api/v1/reviews',
  authorize.verifyUser,
  validUser,
  reviewsController.getReviews
);

// API route for users to retrieve all reviews for a particular recipe
router.post(
  '/api/v1/reviews/:id',
  authorize.verifyUser,
  validUser,
  reviewsController.getRecipeReviews
);

export default router;
