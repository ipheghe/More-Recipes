import authorize from '../../jsontoken.js';

const usersController = require('../controllers').users;
const recipesController = require('../controllers').recipes;
const reviewsController = require('../controllers').reviews;
const favoritesController = require('../controllers').favorites;
const categoriesController = require('../controllers').categories;

console.log(authorize.verifyUser)

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    'error': false, 'message': 'Welcome to the More Recipes!',
  }));

  //API route for users to create accounts
  app.post('/api/users/signup', usersController.signup);
  
  //API route for users to login to the application
  app.post('/api/users/signin', usersController.signin);

  //API route for users to add recipe
  app.post('/api/recipes/', recipesController.create);

    app.get('/api/reviews/list', reviewsController.list);

  //API route for users to update recipe
  app.put('/api/recipes/:id', recipesController.update);

  //API route for users to delete recipe
  app.delete('/api/recipes/:id', recipesController.destroy);

  //API route for users to retrieve all recipes
  app.get('/api/recipes', authorize.verifyUser, recipesController.list);

  //API route for users to post review for a recipe
  app.post('/api/recipes/:recipeId/reviews', reviewsController.create);

  //API route for registered users to favorite recipes
  app.post('/api/users/:userId/favorites', favoritesController.create);//

  //API route for users to retrieve favorite recipes
  app.get('/api/users/:userId/favorites', favoritesController.findAll);//

   //API route for registered users to add categories
  app.post('/api/users/:userId/categories', categoriesController.create);//

   // app.get('/api/users/:userId/recipes', favouritesController.favoriteRecipe);//

  app.get('/api/recipes/upvotes', recipesController.upvotes);

};