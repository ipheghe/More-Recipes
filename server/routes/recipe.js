import express from 'express';
import authorize from '../../jsontoken';
import recipesController from '../controllers/recipes';
import { validateRecipeFields, recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

//API route for users to add recipe
router.post('/api/recipes/', authorize.verifyUser, validUser, validateRecipeFields, recipesController.create);

//API route for users to update recipe
router.put('/api/recipes/:id', authorize.verifyUser, validUser, recipeExists, validateRecipeFields, recipesController.update);

//API route for users to delete recipe
router.delete('/api/recipes/:id', authorize.verifyUser, validUser, recipeExists, recipesController.destroy);

//API route for users to retrieve all recipes
router.get('/api/recipes', authorize.verifyUser, recipesController.getRecipes, recipesController.getTopRecipes, recipesController.searchRecipesByIngredients);

//API route for users to retrieve only personal recipes
router.get('/api/recipes/users', authorize.verifyUser, validUser, recipesController.getUserRecipes);

//API route to retrieve recipes by recipeId and it increments the views column each time recipe is viewed 
router.get('/api/recipes/:id', authorize.verifyUser, validUser, recipeExists, recipesController.viewRecipe);

export default router;
