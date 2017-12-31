import express from 'express';
import authorize from '../middlewares/requireAuth';
import { favorites } from '../controllers';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';
import { categoryExists } from '../middlewares/categoryValidation';
import favoriteExists from '../middlewares/favoriteValidation';

const router = express.Router();

// API route for registered users to favorite recipes
router.post(
  '/api/v1/recipe/:id/:categoryId/favorite',
  authorize.verifyUser,
  validUser,
  recipeExists,
  categoryExists,
  favoriteExists,
  favorites.addFavorites
);

// API route for users to unfavorite recipes
router.delete(
  '/api/v1/favorite/:id',
  authorize.verifyUser,
  validUser,
  recipeExists,
  favorites.unFavoriteRecipe
);

// API route for users to retrieve favorite recipe
router.get(
  '/api/v1/favorite/:id',
  authorize.verifyUser,
  validUser,
  favorites.retrieveFavorite
);

// API route for users to retrieve favorite recipes
router.get(
  '/api/v1/favorites',
  authorize.verifyUser,
  validUser,
  favorites.retrieveFavorites
);

export default router;
