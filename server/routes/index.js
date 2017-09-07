import authorize from '../../jsontoken.js';
import votesController from '../controllers/votes';

const usersController = require('../controllers').users;
const recipesController = require('../controllers').recipes;
const reviewsController = require('../controllers').reviews;
const favoritesController = require('../controllers').favorites;
const categoriesController = require('../controllers').categories;
// const votesController = require('../controllers').votes;

//console.log(authorize.verifyUser)

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    'error': false, 'message': 'Welcome to the More Recipes!',
  }));

  //API route for users to create accounts
  app.post('/api/users/signup', usersController.signup);
  
  //API route for users to login to the application
  app.post('/api/users/signin', usersController.signin);

  //API route for users to add recipe
  app.post('/api/recipes/', authorize.verifyUser, recipesController.create);

  app.get('/api/reviews/list', reviewsController.list);

  //API route for users to update recipe
  app.put('/api/recipes/:id', authorize.verifyUser, recipesController.update);

  //API route for users to delete recipe
  app.delete('/api/recipes/:id', authorize.verifyUser, recipesController.destroy);

  //API route for users to retrieve all recipes
  app.get('/api/recipes', authorize.verifyUser, recipesController.list);

  //API route for users to post review for a recipe
  app.post('/api/recipes/:recipeId/reviews', authorize.verifyUser, reviewsController.create);

  //API route for registered users to favorite recipes
  app.post('/api/users/:userId/favorites', authorize.verifyUser, favoritesController.create);//

  //API route for users to retrieve favorite recipes
  app.get('/api/users/:userId/favorites', authorize.verifyUser, favoritesController.findAll);//

   //API route for registered users to add categories
  app.post('/api/users/:userId/categories', authorize.verifyUser, categoriesController.create);//

   //app.get('/api/recipes/', recipesController.findAll);//

  app.get('/api/recipes/upvotes', recipesController.upvotes);


  app.post('/api/users/:userId/:recipeId/votes', votesController.create);

 app.put('/api/votes/:userId/:recipeId', votesController.update);


}