const Recipe = require('../models').Recipe;
const User = require('../models').User;
const Vote = require('../models').Vote;

module.exports = {
  create(req, res) {

    //validate recipe fields
    let valid = validateRecipe(req,res);

    if (!valid) {

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
      let valid = validateRecipe(req,res);

      if (!valid) {

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
        
  }

};

// Get user personal recipes controller
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


module.exports.upvotes = (req, res) => {


            if (req.query.sort || req.query.order){

             let order = req.query.order;
            let sort = req.query.sort;

          console.log(sort,order);
            
            Recipe.findAll({order:[['upvotes' ,'desc']]})
                  .then(recipe => res.status(200).send({message: 'All Recipes Retrieved SuccessFullly!', recipeData: recipe}))
                  .catch(error => res.status(400).send({error: error.message}));
         }
};

let validateRecipe = (req, res) => {

      //check if recipe name field is empty
          if (!req.body.recipeName || req.body.recipeName === '') {
            return res.status(400)
            .send({'message': 'recipe name field cannot be empty',
              'recipeData': req.body
            });
          }
          //check if ingredients field is empty
          if (!req.body.ingredients || req.body.ingredients === '') {
            return res.status(400)
            .send({'message': 'ingredients field cannot be empty',
              'recipeData': req.body
            });
          }
          //check if directions field is empty
         if (!req.body.directions || req.body.ingredients === '' ) {
            return res.status(400)
            .send({'message': 'directions field cannot be empty',
              'recipeData': req.body
            });
          }

          //check if views contains a negative value
         if (parseInt(req.body.views) < 0) {
            return res.status(400)
            .send({'message': 'views cannot be a negative number',
              'recipeData': req.body
            });
          }

          //check if upvotes contains a negative value
         if (parseInt(req.body.upvotes) < 0) {
            return res.status(400)
            .send({'message': 'upvotes cannot be a negative number',
              'recipeData': req.body
            });
          }

          //check if upvotes contains a negative value
         if (parseInt(req.body.downvotes) < 0) {
            return res.status(400)
            .send({ 'message': 'downvotes cannot be a negative number',
              'recipeData': req.body
            });
          }

          //check if notification contains a negative value
         if (parseInt(req.body.notification) < 0) {
            return res.status(400)
            .send({'message': 'notification cannot be a negative number',
              'recipeData': req.body
            });
          }
} ;

