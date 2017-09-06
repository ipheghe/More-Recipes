const Recipe = require('../models').Recipe;
const User = require('../models').User;

module.exports = {
  create(req, res) {

    //validate recipe fields
    let valid = validateRecipe(req,res,);

    if (!valid) {

       return Recipe

    // logged-in user can add recipe
      .create({
          recipeName: req.body.recipeName,
          recipeDescription: req.body.recipeDescription,
          ingredients: req.body.ingredients,
          directions: req.body.directions,
          imageUrl: 'no image',
          views: parseInt(req.body.views),
          upvotes: parseInt(req.body.upvotes),
          notification: parseInt(req.body.notification),
          userId: req.body.userId,
      })
      .then(recipe => res.status(201).send({'message': 'Recipe Added SuccessFullly!', 'recipeData': recipe}))
      .catch(error => res.status(400).send({'error': error.message}));
    }
  },

  update(req, res) {
     console.log('-----------------------------------------------');
    console.log(req.params);
    return Recipe
    //find if recipe exits

      .find({
          where: {
            id: req.params.id,
          }
        })
      .then(recipe => {
        //if recipe does not exist
        if (!recipe) {
          return res.status(404).send({
            error: {message: 'Recipe Not Found'}
          });
        }

      let valid = validateRecipe(req,res,);

      if (!valid) {

        //if recipe exits, update the fields
        return recipe

          .update({
          recipeName: req.body.recipeName || recipe.recipeName,
          recipeDesc: req.body.recipeDesc || recipe.recipeDesc,
          ingredients: req.body.ingredients || recipe.ingredients,
          directions: req.body.directions || recipe.directions,
          imageUrl: "no image" || recipe.imageUrl,
          views: parseInt(req.body.views) || recipe.views,
          upvotes: parseInt(req.body.upvotes) || recipe.upvotes,
          downvotes: parseInt(req.body.downvotes) || recipe.downvotes,
          category: req.body.category || recipe.category,
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
      .find({
          where: {
            id: req.params.id,
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
          .then((deleted) => res.status(204).send({'message': 'Recipe Deleted SuccessFullly!'}))
          .catch(error => res.status(400).send({error: error.message}));
      })
      .catch(error => res.status(400).send({error: error.message}));
  },

  list(req, res) {
    //get all recipes from table
                if (req.query.sort || req.query.order){

             let order = req.query.order;
            let sort = req.query.sort;

            return Recipe
            .findAll({order:[[sort ,order]]})
                  .then(recipe => res.status(200).send({message: 'All Recipes Retrieved !!!!!SuccessFullly!', recipeData: recipe}))
                  .catch(error => res.status(400).send({error: error.message}));
         }
         else{
          return Recipe
                .all()
      .then(recipe => res.status(200).send({message: 'All Recipes Retrieved SuccessFullly!', recipeData: recipe}))
      .catch(error => res.status(400).send({error: error.message}));
         }
        

  },

   retrieve (req, res)  {
    //get all recipes by upvotes

          // let arranged;
          // return Recipe
          // .findAll({
          //     attributes: [recipeName, upvotes] })
          //       .then(result => 
          //         arranged = result.upvotes.sort((a,b) => {
          //         return (b-a);});
          //         res.status(200).send(arranged))
          //       .catch(error => 
          //       console.log(error)
          //       res.status(400).send(error));

          //     //get all recipes by upvotes
         // let sortList = true;
         // let orderList = true;
         // if (req.query.sort !== 'upvotes') {
         //     sortList = false;
         //  }
 
         //  if (req.query.order !== 'ascending') {
         //     orderList = false;
         //  }

         if (req.query.sort || req.query.order){

             let order = req.query.order;
            let sort = req.query.sort;

             return Recipe
            .findAll({order:[[sort ,order]], limit: 3})
                  .then(recipe => res.status(200).send({message: 'All Recipes Retrieved SuccessFullly!', recipeData: recipe}))
                  .catch(error => res.status(400).send({error: error.message}));
         }

          // if (sortList && orderList) {
             //Recipe.findAll({ where: {order: [['recipeName', 'DESC']]}})
               //Recipe.findAll({ where: { upvotes: 1} })
            //const neqQuery = sequelize.query('SELECT * FROM "Recipes" ORDER BY "upvotes"')

         // }else{


         // }
  }

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


module.exports.upvotes = (req, res) => {

          // let order = req.query.order;
          // let sort = req.query.sort;

          // // if (sortList && orderList) {
          //    //Recipe.findAll({ where: {order: [['recipeName', 'DESC']]}})
          //      //Recipe.findAll({ where: { upvotes: 1} })
          //   //const neqQuery = sequelize.query('SELECT * FROM "Recipes" ORDER BY "upvotes"')
          // console.log(sort,order);
          //   Recipe.findAll({attributes: ['recipeName','upvotes','downvotes'],order:[[sort ,order]], limit: 3})
          //         .then(recipe => res.status(200).send({message: 'All Recipes Retrieved SuccessFullly!', recipeData: recipe}))
          //         .catch(error => res.status(400).send({error: error.message}));

      // Recipe.all()
      // .then((recipe) => {

      //   if(recipe){

            if (req.query.sort || req.query.order){

             let order = req.query.order;
            let sort = req.query.sort;

          console.log(sort,order);
            
            Recipe.findAll({order:[['upvotes' ,'desc']]})
                  .then(recipe => res.status(200).send({message: 'All Recipes Retrieved SuccessFullly!', recipeData: recipe}))
                  .catch(error => res.status(400).send({error: error.message}));
         }
        

      // })
      // .catch(error => res.status(400).send({error: error.message}));
};


// module.exports.retrive = (req, res) => {
//     //get all recipes by upvotes

//           let arranged;
//           Recipe.findAll({
//               attributes: [recipeName, upvotes] })
//                 .then(result => 
//                   arranged = result.upvotes.sort((a,b) => {
//                   return b-a;});
//                   res.status(200).send(arranged))
//                 .catch(error => 
//                 console.log(error)
//                 res.status(400).send(error));
//   };

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

          //check if reviews contains a negative value
         if (parseInt(req.body.reviews) < 0) {
            return res.status(400)
            .send({ 'message': 'reviews cannot be a negative number',
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

