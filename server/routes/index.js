const usersController = require('../controllers').users;
const recipesController = require('../controllers').recipes;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the More Recipes!',
  }));

  //API routes for users to create accounts
  app.post('/api/users/signup', usersController.signup);
  
  //API routes for users to login to the application
  app.post('/api/users/signin', usersController.signin);

    //API routes for users to add recipe
  app.post('/api/recipes/', recipesController.create);
};