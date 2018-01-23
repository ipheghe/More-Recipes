import express from 'express';
import authorize from '../middlewares/requireAuth';
import { recipes } from '../controllers';
import { validateRecipeFields, recipeExists, userRecipeExists }
  from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const recipesController = recipes;
const recipeRoute = express.Router();

// API route for users to add recipe
recipeRoute.post(
  '/api/v1/recipe/',
  authorize.verifyUser,
  validUser,
  validateRecipeFields,
  recipesController.addRecipe
);

// API route for users to update recipe
recipeRoute.put(
  '/api/v1/recipe/:id',
  authorize.verifyUser,
  validUser,
  recipeExists,
  userRecipeExists,
  recipesController.updateRecipe
);

// API route for users to delete recipe
recipeRoute.delete(
  '/api/v1/recipe/:id',
  authorize.verifyUser,
  validUser, recipeExists,
  userRecipeExists,
  recipesController.deleteRecipe
);

// API route for users to retrieve all recipes
recipeRoute.post(
  '/api/v1/recipes',
  authorize.verifyUser,
  recipesController.getRecipes,
  recipesController.getTopRecipes,
  recipesController.searchRecipesByIngredients,
  recipesController.searchRecipes
);

// API route for users to retrieve only personal recipes
recipeRoute.post(
  '/api/v1/recipes/users',
  authorize.verifyUser,
  validUser,
  recipesController.getUserRecipes
);

// API route to retrieve recipes by recipeId and
// it increments the views column each time recipe is viewed
recipeRoute.get(
  '/api/v1/view-recipe/:id',
  authorize.verifyUser,
  validUser,
  recipeExists,
  recipesController.viewRecipe
);

// API route to retrieve recipe by recipe
recipeRoute.get(
  '/api/v1/recipe/:id',
  authorize.verifyUser,
  validUser,
  recipeExists,
  recipesController.getRecipe
);

// API route for users to retrieve all recipes
recipeRoute.get(
  '/api/v1/topRecipes',
  recipesController.getTopRecipes
);

export default recipeRoute;
