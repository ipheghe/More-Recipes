import express from 'express';
import authorize from '../../jsontoken';
import reviewsController from '../controllers/reviews';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';
import validateReview from '../middlewares/reviewValidation';

const router = express.Router();

//API route for users to post review for a recipe
router.post('/api/recipes/:id/reviews', authorize.verifyUser, validUser, recipeExists, validateReview, reviewsController.postReview);

//API route for users to retrieve all reviews
router.get('/api/reviews', authorize.verifyUser, validUser, reviewsController.getReviews);

//API route for users to retrieve all reviews for a particular recipe
router.get('/api/reviews/:id', authorize.verifyUser, validUser, recipeExists, reviewsController.getRecipeReviews);

export default router;