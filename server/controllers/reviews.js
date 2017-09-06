const Review = require('../models').Review;
const Recipe = require('../models').Recipe;


module.exports.create = (req, res) => {

          console.log(req.params.recipeId);

    //check if password field is empty
    if (!req.body.message || req.body.message.trim() === '') {
      return res.status(400)
      .send({'message': 'review field cannot be empty',
        'reviewData': req.body
      });
    }
  //find if recipe is availabe before review can be posted on it
  Recipe.findOne({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      //if recipe is not found
      if (!recipe) {
        res.send({error: { message: 'Recipe does not exist' }});
      } else {
        //recipe is found then review can be posted for it

        Review.create({
              message: req.body.message,
              recipeId: req.params.recipeId,
              userId: req.body.userId,
        })
          .then((review) => res.status(201).send({ 'message': 'Review Posted Successfully', 'reviewData': review }))
          .catch((error) => {
            res.status(400).send({error: error.message});
          });
      }
    });
};

  module.exports.list = (req, res)  => {
    //get all recipes from table
      Review.all()
      .then(review => res.status(200).send({message: 'All Recipes Retrieved SuccessFullly!', recipeData: review}))
      .catch(error => res.status(400).send({error: error.message}));
  };

