import db from '../models/index';

// Assign variable to the database model
const { User, Recipe, Review } = db;
const keys = ['id', 'message', 'createdAt'];
let pageNumber;

const reviewsController = {

  /**
   * @module postReview
   * @description controller function that creates post review record for users
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Object} next - Express next middleware function
   * @return {object} message reviewData
   */
  postReview(req, res, next) {
    Review.create({
      message: req.body.message,
      userId: req.decoded.user.id,
      recipeId: req.params.id,
    })
      .then((review) => {
        res.status(201).send({
          message: 'Review Posted Successfully',
          review
        });
        next();
      })
      .catch(error => res.status(401).send({
        error: error.message
      }));
  },

  /**
   * @module getReviews
   * @description controller function that gets all reviews from table
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message reviewList
   */
  getReviews(req, res) {
    // get all reviews from table
    Review.all({
      include: [{
        model: Recipe,
        attributes: ['name']
      },
      {
        model: User,
        attributes: ['username'],
      }
      ],
      attributes: keys
    })
      .then(reviews => res.status(200).send({
        message: 'All Reviews Retrieved SuccessFullly!',
        reviews
      }))
      .catch(error => res.status(400).send({
        error: error.message
      }));
  },

  /**
   * @module getRecipeReviews
   * @description controller function that gets reviews for a particular recipe
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message reviewList
   */
  getRecipeReviews(req, res) {
    const { limit, offset } = req.body;
    Review.findAndCountAll({
      where: {
        recipeId: req.params.id
      },
      include: [{
        model: Recipe,
        attributes: ['name']
      },
      {
        model: User,
        attributes: ['username'],
      }
      ],
      attributes: keys,
      order: [
        ['createdAt', 'desc']
      ],
      limit: limit || 6,
      offset: offset || 0
    })
      // retrieve all recipes for that particular user
      .then((reviews) => {
        if (reviews) {
          if (reviews.rows.length === 0) {
            res.send({
              message: 'No review for this recipe!'
            });
          } else {
            pageNumber = parseInt(reviews.count, 10) / parseInt(limit || 6, 10);
            return res.status(200).send({
              message: 'Recipe reviews Retrieved SuccessFullly!',
              reviews,
              pages: Math.ceil(pageNumber)
            });
          }
        }
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  }
};
export default reviewsController;
