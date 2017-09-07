const Review = require('../models').Review;
const Recipe = require('../models').Recipe;
const User = require('../models').User;



module.exports.create = (req, res) => {

  let valid = validateReview(req,res);

  if (!valid) {
  //find if recipe is availabe before review can be posted on it
  Recipe.findOne({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      //if recipe is not found
      if (!recipe) {
        res.send({'message': 'Recipe does not exist' });
      } else {
        //recipe is found then review can be posted for it
        Review.create({
              message: req.body.message,
              recipeId: req.params.recipeId,
              userId: req.body.userId,
        })
          .then((reviews) => res.status(201).send({ 'message': 'Review Posted Successfully', 'reviewData': reviews }))
          // .catch((error) => {
          //   res.status(400).send({error: error.message});
          // });
      }
    });

  }
};

  module.exports.list = (req, res)  => {
    //get all reviews from table
      Review.findAll({ include: [{model: User, attributes: ['username']},
      {model: Recipe, attributes: ['recipeName']}] })
      .then(review => res.status(200).send({message: 'All Reviews Retrieved SuccessFullly!', reviewList: review}))
      .catch(error => res.status(400).send({error: error.message}));
  };


let validateReview = (req, res) =>{

      //check if password field is empty
    if (!req.body.message || req.body.message.trim() === '') {
      return res.status(400)
      .send({'message': 'review field cannot be empty',
        'reviewData': req.body
      });
    }

}
