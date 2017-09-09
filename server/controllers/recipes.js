import * as validate from '../middlewares/validateRecipeFields';
const Recipe = require('../models').Recipe;
const User = require('../models').User;
const Vote = require('../models').Vote;

const recipesController = {

  create(req, res) {
    //validate recipe fields
    let isRecipeValid = validate.validateRecipe(req,res);

    if (!isRecipeValid) {

       return Recipe
    // logged-in user can add recipe
      .create({
          recipeName: req.body.recipeName,
          recipeDescription: req.body.recipeDescription,
          ingredients: req.body.ingredients,
          directions: req.body.directions,
          imageUrl: 'no image',
          views: 0,
          upvotes: 0,
          downvotes: 0,
          notification: 0,
          userId: req.body.userId,
      })
      .then(recipe => res.status(201).send({'message': 'Recipe Added SuccessFullly!', 'recipeData': recipe}))
      .catch(error => res.status(400).send({'error': error.message}));
    }
  },

  update(req, res) {
    return Recipe
    //find if recipe exits

      .find({where: {id: req.params.id, }})
      .then(recipe => {
        //if recipe does not exist
        if (!recipe) {
          return res.status(404).send({'message': 'Recipe Not Found!'});
        }

        //validate fields
      let isRecipeValid = validate.validateRecipe(req,res);

      if (!isRecipeValid) {

        //if recipe exits, update the fields
        return recipe

          .update({
          recipeName: req.body.recipeName || recipe.recipeName,
          recipeDesc: req.body.recipeDesc || recipe.recipeDesc,
          ingredients: req.body.ingredients || recipe.ingredients,
          directions: req.body.directions || recipe.directions,
          imageUrl: "no image" || recipe.imageUrl,
          notification: parseInt(req.body.notification) || recipe.notification,
          })
          .then(updatedRecipe => res.status(200).send({message: 'Recipe Upated SuccessFullly!', recipeData: recipe}))
          .catch(error => res.status(400).send({error: error.message}));
        }
      })
      .catch(error => res.status(400).send({error: error.message}));

  },

  destroy(req, res) {
    return Recipe
    //find if recipe exits
      .find({where: {id: req.params.id,},})
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
          .then((deleted) => res.status(204).send({'message': 'Recipe Deleted SuccessFullly!'}))
          .catch(error => res.status(400).send({error: error.message}));
      })
      .catch(error => res.status(400).send({error: error.message}));
  },

  list(req, res) {
    //get all recipes from table by sort or and order parameter 
    if (req.query.sort || req.query.order){

        let order = req.query.order;
        let sort = req.query.sort;

          return Recipe
          .findAll({order:[[sort ,order]]})
            .then(recipe => res.status(200).send({message: 'All Recipes Retrieved !!!!!SuccessFullly!', recipeData: recipe}))
            .catch(error => res.status(400).send({error: error.message}));
    }
    else{
      // no sort or order parameter, retrieve all recipes
        return Recipe
        .all({include:[{model:User,attributes:['username']}]})
          .then(recipe => res.status(200).send({message: 'All Recipes Retrieved SuccessFullly!', recipeData: recipe}))
          .catch(error => res.status(400).send({error: error.message}));
     }    
  },
  // Get user personal recipes 
  userList(req, res) {

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
  } 

};
export default recipesController;
