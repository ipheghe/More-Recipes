const Recipe = require('../models').Recipe;
const User = require('../models').User;

module.exports = {
  create(req, res) {

      //Give any image name here.
    //let imageData = fs.readFileSync('./egusi_soup.jpg');
    return Recipe
    // logged-in user can add recipe
      .create({
          recipeName: req.body.recipeName,
          recipeDesc: req.body.recipeDesc,
          ingredients: req.body.ingredients,
          directions: req.body.directions,
          image: "defaultImage",
          views: parseInt(req.body.views),
          upvotes: parseInt(req.body.upvotes),
          downvotes: parseInt(req.body.downvotes),
          notification: parseInt(req.body.notification),
          postedBy: parseInt(req.body.postedBy),
      })
      .then(recipe => res.status(201).send('Recipe Added'))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Recipe
    //find if recipe exits
      .find({
          where: {
            recipeId: req.params.recipeId,
          },
        })
      .then(recipe => {
        //if recipe does not exist
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }

        //if recipe exits, update the fields
        return recipe
          .update({
          recipeName: req.body.recipeName || recipe.recipeName,
          recipeDesc: req.body.recipeDesc || recipe.recipeDesc,
          ingredients: req.body.ingredients || recipe.ingredients,
          directions: req.body.directions || recipe.directions,
          image: "defaultImage" || recipe.defaultImage,
          views: parseInt(req.body.views) || recipe.views,
          upvotes: parseInt(req.body.upvotes) || recipe.upvotes,
          downvotes: parseInt(req.body.downvotes) || recipe.downvotes,
          notification: parseInt(req.body.notification) || recipe.notification,
          })
          .then(updatedRecipe => res.status(200).send('Recipe Updated'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Recipe
    //find if recipe exits
      .find({
          where: {
            recipeId: req.params.recipeId,
          },
        })
      .then(recipe => {
        //if recipe does not exist
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        //if recipe exits, delete the recipe
        return recipe
          .destroy()
          .then((deleted) => res.status(204).send('Recipe Deleted'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    //get all recipes from table
    return Recipe
      .all()
      .then(recipe => res.status(200).send(recipe))
      .catch(error => res.status(400).send(error));
  },


  retrive(req, res) {
    //get all recipes by upvotes
    return Recipe
      .findAll({
        order: [
          [sequelize.fn('max', sequelize.col(rew.query.upvotes)), 'ASC'],
        ]
      })
      .then(recipe => res.status(200).send(recipe))
      .catch(error => res.status(400).send(error));
  },



};

// Get user favorites controller
module.exports.findAll = (req, res) => {

  //find all recipes that have the requested username 
  Recipe.findAll({ where: { postedBy: req.params.postedBy} })

      //retrieve all recipes for that particular user
    .then((recipe) => {
      if (recipe) {
        res.send(recipe);
      } else {
        res.send('There are no favourite recipe for this user')
          .catch((error) => {
            res.status(400).send(error);
          });
      }
    })
    .catch(error => res.status(400).send(error));
};


