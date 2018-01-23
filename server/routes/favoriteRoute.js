import express from 'express';
import authorize from '../middlewares/requireAuth';
import { favorites } from '../controllers';
import { recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';
import { categoryExists } from '../middlewares/categoryValidation';
import favoriteExists from '../middlewares/favoriteValidation';

const favoritesController = favorites;
const favoriteRoute = express.Router();

// API route for registered users to favorite recipes
favoriteRoute.post(
  '/api/v1/recipe/:id/:categoryId/favorite',
  authorize.verifyUser,
  validUser,
  recipeExists,
  categoryExists,
  favoriteExists,
  favoritesController.addFavorites
);

// API route for users to unfavorite recipes
favoriteRoute.delete(
  '/api/v1/favorite/:id',
  authorize.verifyUser,
  validUser,
  recipeExists,
  favoritesController.unFavoriteRecipe
);

// API route for users to retrieve favorite recipe
favoriteRoute.get(
  '/api/v1/favorite/:id',
  authorize.verifyUser,
  validUser,
  favoritesController.retrieveFavorite
);

// API route for users to retrieve favorite recipes
favoriteRoute.post(
  '/api/v1/favorites',
  authorize.verifyUser,
  validUser,
  favoritesController.retrieveFavorites
);

export default favoriteRoute;
