import db from '../models/index';

// // Assign variable to the database model
const Review = db.Review;
const User = db.User;
const Recipe = db.Recipe;
const keys = ['id', 'message'];

const reviewsController = {
  //create post review record for users
  postReview(req, res) {   
    Review.create({
      message: req.body.message,
      userId: req.decoded.user.id,
      recipeId: req.params.id,
    })
      .then((reviews) => res.status(201).send({ 'message': 'Review Posted Successfully', 'reviewData': reviews }))
      .catch(error => res.status(400).send({'error': error.message}));
  },
  // get all reviews
  getReviews(req, res) {
    //get all reviews from table
    Review.all({ 
      include: [{
        model: Recipe, 
        attributes: ['recipeName'],
        include: [{
          model: User,
          attributes: ['username']
        }]
      }],
      attributes: keys
    })
      .then(review => res.status(200).send({message: 'All Reviews Retrieved SuccessFullly!', reviewList: review}))
      .catch(error => res.status(400).send({error: error.message}));
  },
  //get reviews for a particular recipe
  getRecipeReviews(req, res)  {
    Review.findAll({
      where: {recipeId: req.params.id},
        include: [{
          model: Recipe, 
          attributes: ['recipeName'],
          include: [{
            model: User,
            attributes: ['username']
          }]
        }],
      attributes: keys
    })
    //retrieve all recipes for that particular user
    .then((review) => {
      if (review) {
        return res.status(200).send({message: 'Recipe reviews Retrieved SuccessFullly!',reviewList: review});
      } else {
        res.send({message: 'No review for this recipe!'})
          .catch((error) => {
            res.status(400).send({error: error.message});
          });
      }
    })
    .catch(error => res.status(400).send({error: error.message}));
  }
};
export default reviewsController;