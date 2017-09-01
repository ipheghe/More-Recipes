const Recipe = require('../models').Recipe;
const User = require('../models').User;

module.exports = {
  create(req, res) {

    //validate recipe fields
    validateRecipe(req,res);

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
      .then(recipe => res.status(201).send({message: 'Recipe Added SuccessFullly!', userData: recipe}))
      .catch(error => res.status(400).send({error: error.message}));
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
            error: {message: 'Recipe Not Found'}
          });
        }

        //validate recipe fields
        validateRecipe(req,res);

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
          .then(updatedRecipe => res.status(200).send({message: 'Recipe Upated SuccessFullly!', recipeData: recipe}))
          .catch(error => res.status(400).send({error: error.message}));
      })
      .catch(error => res.status(400).send({error: error.message}));
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
          .then((deleted) => res.status(204).send({message: 'Recipe Deleted SuccessFullly!', recipeData: recipe}))
          .catch(error => res.status(400).send({error: error.message}));
      })
      .catch(error => res.status(400).send({error: error.message}));
  },

  list(req, res) {
    //get all recipes from table
    return Recipe
      .all()
      .then(recipe => res.status(200).send({message: 'All Recipes Retrieved SuccessFullly!', recipeData: recipe}))
      .catch(error => res.status(400).send({error: error.message}));
  },


  // retrive(req, res) {
  //   //get all recipes by upvotes
  //   return Recipe
  //     .findAll({
  //       order: [
  //         [sequelize.fn('max', sequelize.col(rew.query.upvotes)), 'ASC'],
  //       ]
  //     })
  //     .then(recipe => res.status(200).send(recipe))
  //     .catch(error => res.status(400).send(error));
  // },



};

// Get user favorites controller
module.exports.findAll = (req, res) => {

  //find all recipes that have the requested username 
  Recipe.findAll({ where: { postedBy: req.params.userId} })

      //retrieve all recipes for that particular user
    .then((recipe) => {
      if (recipe) {
        res.send(recipe);
      } else {
        res.send({message: 'There are no favourite recipe for this user'})
          .catch((error) => {
            res.status(400).send({error: error.message});
          });
      }
    })
    .catch(error => res.status(400).send({error: error.message}));
};

let validateRecipe = (req, res) => {

      //check if recipe name field is empty
          if (!req.body.recipeName) {
            return res.status(400)
            .send({
              error: { message: 'recipe name field cannot be empty' },
              recipeData: req.body
            });
          }
          //check if ingredients field is empty
          if (!req.body.ingredients) {
            return res.status(400)
            .send({
              error: { message: 'ingredients field cannot be empty' },
              recipeData: req.body
            });
          }
          //check if directions field is empty
         if (!req.body.directions) {
            return res.status(400)
            .send({
              error: { message: 'directions field cannot be empty' },
              recipeData: req.body
            });
          }

          //check if views contains a negative value
         if (parseInt(req.body.views) < 0) {
            return res.status(400)
            .send({
              error: { message: 'views cannot be a negative number' },
              recipeData: req.body
            });
          }

          //check if reviews contains a negative value
         if (parseInt(req.body.reviews) < 0) {
            return res.status(400)
            .send({
              error: { message: 'reviews cannot be a negative number' },
              recipeData: req.body
            });
          }

          //check if upvotes contains a negative value
         if (parseInt(req.body.upvotes) < 0) {
            return res.status(400)
            .send({
              error: { message: 'upvotes cannot be a negative number' },
              recipeData: req.body
            });
          }

          //check if upvotes contains a negative value
         if (parseInt(req.body.downvotes) < 0) {
            return res.status(400)
            .send({
              error: { message: 'downvotes cannot be a negative number' },
              recipeData: req.body
            });
          }

          //check if notification contains a negative value
         if (parseInt(req.body.notification) < 0) {
            return res.status(400)
            .send({
              error: { message: 'notification cannot be a negative number' },
              recipeData: req.body
            });
          }
} ;

