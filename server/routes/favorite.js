import express from 'express';
import authorize from '../../jsontoken';
import favoritesController from '../controllers/favorites';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';
import { categoryExists } from '../middlewares/categoryValidation';
import favoriteExists from '../middlewares/favoriteValidation';

const router = express.Router();

//API route for registered users to favorite recipes
router.post('/api/recipes/:recipeId/:categoryId/favorites', authorize.verifyUser, validUser, recipeExists, categoryExists, favoriteExists, favoritesController.addFavorites);

//API route for users to retrieve favorite recipes
router.get('/api/users/favorites', authorize.verifyUser, validUser, favoritesController.retrieveFavorites);

export default router;