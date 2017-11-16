import express from 'express';
import authorize from '../middlewares/requireAuth';
import favoritesController from '../controllers/favorites';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';
import { categoryExists } from '../middlewares/categoryValidation';
import favoriteExists from '../middlewares/favoriteValidation';

const router = express.Router();

// API route for registered users to favorite recipes
router.post(
  '/api/v1/recipes/:id/:categoryId/favorites',
  authorize.verifyUser,
  validUser,
  recipeExists,
  categoryExists,
  favoriteExists,
  favoritesController.addFavorites
);

// API route for users to unfavorite recipes
router.delete(
  '/api/v1/favorites/:id',
  authorize.verifyUser,
  validUser,
  recipeExists,
  favoritesController.unFavoriteRecipe
);

// API route for users to retrieve favorite recipe
router.get(
  '/api/v1/favorite/:id',
  authorize.verifyUser,
  validUser,
  favoritesController.retrieveFavorite
);

// API route for users to retrieve favorite recipes
router.get(
  '/api/v1/favorites',
  authorize.verifyUser,
  validUser,
  favoritesController.retrieveFavorites
);

export default router;
