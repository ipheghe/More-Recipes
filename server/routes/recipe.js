import express from 'express';
import authorize from '../../jsontoken';
import recipesController from '../controllers/recipes';
import { validateRecipeFields, recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';
import upload from '../middlewares/uploadRecipeImage';

const router = express.Router();

//API route for users to add recipe
router.post('/api/v1/recipes/', authorize.verifyUser, validUser, validateRecipeFields, recipesController.create);

//API route for users to update recipe
router.put('/api/v1/recipes/:id', authorize.verifyUser, validUser, recipeExists, validateRecipeFields, recipesController.update);

//API route for users to delete recipe
router.delete('/api/v1/recipes/:id', authorize.verifyUser, validUser, recipeExists, recipesController.destroy);

//API route for users to retrieve all recipes
router.get('/api/v1/recipes', authorize.verifyUser, recipesController.getRecipes, recipesController.getTopRecipes, recipesController.searchRecipesByIngredients);

//API route for users to retrieve only personal recipes
router.get('/api/v1/recipes/users', authorize.verifyUser, validUser, recipesController.getUserRecipes);

//API route to retrieve recipes by recipeId and it increments the views column each time recipe is viewed 
router.get('/api/v1/recipes/:id', authorize.verifyUser, validUser, recipeExists, recipesController.viewRecipe);

//API route to retrieve recipes by recipeId and it increments the views column each time recipe is viewed 
router.get('/api/v1/recipes/:recipeName', authorize.verifyUser, validUser, recipeExists, recipesController.getRecipe);

export default router;
