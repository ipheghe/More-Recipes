import express from 'express';
import authorize from '../../jsontoken';
import reviewsController from '../controllers/reviews';
import reviewNotification from '../controllers/notifications';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';
import validateReview from '../middlewares/reviewValidation';

const router = express.Router();

//API route for users to post review for a recipe
router.post('/api/v1/recipes/:id/reviews', authorize.verifyUser, validUser, recipeExists, validateReview, reviewNotification, reviewsController.postReview);

//API route for users to retrieve all reviews
router.get('/api/v1/reviews', authorize.verifyUser, validUser, reviewsController.getReviews);

//API route for users to retrieve all reviews for a particular recipe
router.get('/api/v1/reviews/:id', authorize.verifyUser, validUser, reviewsController.getRecipeReviews);

export default router;