import express from 'express';
import authorize from '../middlewares/requireAuth';
import { recipes } from '../controllers';
import { validateRecipeFields, recipeExists, userRecipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

// API route for users to add recipe
router.post(
  '/api/v1/recipe/',
  authorize.verifyUser,
  validUser,
  validateRecipeFields,
  recipes.addRecipe
);

// API route for users to update recipe
router.put(
  '/api/v1/recipe/:id',
  authorize.verifyUser,
  validUser,
  recipeExists,
  userRecipeExists,
  validateRecipeFields,
  recipes.updateRecipe
);

// API route for users to delete recipe
router.delete(
  '/api/v1/recipe/:id',
  authorize.verifyUser,
  validUser, recipeExists,
  userRecipeExists,
  recipes.deleteRecipe
);

// API route for users to retrieve all recipes
router.post(
  '/api/v1/recipes',
  authorize.verifyUser,
  recipes.getRecipes,
  recipes.getTopRecipes,
  recipes.searchRecipesByIngredients,
  recipes.searchRecipes
);

// API route for users to retrieve only personal recipes
router.post(
  '/api/v1/recipes/users',
  authorize.verifyUser,
  validUser,
  recipes.getUserRecipes
);

// API route to retrieve recipes by recipeId and
// it increments the views column each time recipe is viewed
router.get(
  '/api/v1/recipe/:id',
  authorize.verifyUser,
  validUser,
  recipeExists,
  recipes.viewRecipe
);

// API route to retrieve recipe by recipeId
router.get(
  '/api/v1/recipe/:recipeName',
  authorize.verifyUser,
  validUser,
  recipeExists,
  recipes.getRecipe
);

// API route for users to retrieve all recipes
router.get(
  '/api/v1/topRecipes',
  recipes.getTopRecipes
);

export default router;
