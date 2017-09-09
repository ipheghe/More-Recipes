import authorize from '../../jsontoken.js';
import usersController from '../controllers/users';
import recipesController from '../controllers/recipes';
import reviewsController from '../controllers/reviews';
import categoriesController from '../controllers/categories';
import favoritesController from '../controllers/favorites';
import votesController from '../controllers/votes';

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

  //API route for users to retrieve only personal recipes
  app.get('/api/recipes/:userId', authorize.verifyUser, recipesController.userList);

  //API route for users to post review for a recipe
  app.post('/api/recipes/:recipeId/reviews', authorize.verifyUser, reviewsController.create);

  //API route for registered users to favorite recipes
  app.post('/api/users/:userId/favorites', authorize.verifyUser, favoritesController.create);

  //API route for users to retrieve favorite recipes
  app.get('/api/users/:userId/favorites', authorize.verifyUser, favoritesController.list);

   //API route for registered users to add categories
  app.post('/api/users/:userId/categories', authorize.verifyUser, categoriesController.create);

  app.post('/api/users/:userId/:recipeId/votes', votesController.create);

  app.put('/api/votes/:userId/:recipeId', votesController.update);
}