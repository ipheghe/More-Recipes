const usersController = require('../controllers').users;
const recipesController = require('../controllers').recipes;
const commentsController = require('../controllers').comments;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the More Recipes!',
  }));

  //API route for users to create accounts
  app.post('/api/users/signup', usersController.signup);
  
  //API route for users to login to the application
  app.post('/api/users/signin', usersController.signin);

  //API route for users to add recipe
  app.post('/api/recipes/', recipesController.create);

  //API route for users to update recipe
  app.put('/api/recipes/:recipeId', recipesController.update);

  //API route for users to delete recipe
  app.delete('/api/recipes/:recipeId', recipesController.destroy);

  //API route for users to retrieve all recipes
  app.get('/api/recipes', recipesController.list);

  //API route for users to post review for a recipe
  app.post('/api/recipes/:recipeId/reviews', commentsController.create);

  //API route for users to retrieve favorite recipes
  app.get('/api/users/:userId/recipes', recipesController.findAll);
};