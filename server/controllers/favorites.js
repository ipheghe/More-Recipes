 const Favorite = require('../models').Favorite;
 const User = require('../models').User;
 const Category = require('../models').Category;
 const Recipe = require('../models').Recipe;

module.exports.create = (req, res) => {

  //find if user is availabe before recipe can be added to favorites
  User.findOne({ where: { id: req.params.userId } })
    .then((user) => {
      //if user is not found
      if (!user) {
        res.send({'message': 'User does not exist' });
      } else {
        //user is found then recipe can be added to favorites
        Favorite.create({
              recipeId: req.body.recipeId,
              categoryId: req.body.categoryId ,
              userId: req.params.userId,
        })
          .then((category) => res.status(201).send({ 'message': 'Recipe added to favorites Successfully', 'favoriteData': category }))
          .catch((error) => {
            res.status(400).send({error: error.message});
          });
      }
    });
};

// Get user favorites controller
module.exports.findAll = (req, res) => {
  
  //find all recipes that have the requested username 
  Favorite.findAll({ 
    attributes: [],
    where: { userId: req.params.userId}, 
    include: [{model: User, attributes: ['username']},
    {model: Recipe, attributes: ['recipeName','recipeDescription','ingredients','directions']}] })

      //retrieve all recipes for that particular user
    .then((favorite) => {
      if (favorite) {
        res.status(200).send({ 'message': 'User Favorite recipes retrieved Successfully', 'userFavorites': favorite });
      } else {
        res.send({message: 'There are no favourite recipe for this user'})
          .catch((error) => {
            res.status(400).send({error: error.message});
          });
      }
    })
    .catch(error => res.status(400).send({error: error.message}));
};
