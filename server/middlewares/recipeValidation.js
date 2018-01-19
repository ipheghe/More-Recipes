import db from '../models/index';

const { Recipe } = db;


/**
 * @module validateRecipeFields
 * @description middleware function to validate recipe fields
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const validateRecipeFields = (req, res, next) => {
  // check if recipe name field is empty
  if (!req.body.name || req.body.name === '') {
    return res.status(400)
      .send({
        message: 'name field cannot be empty',
        recipeData: req.body
      });
  }
  // check if ingredients field is empty
  if (!req.body.ingredients || req.body.ingredients === '') {
    return res.status(400)
      .send({
        message: 'ingredients field cannot be empty',
        recipeData: req.body
      });
  }
  // check if directions field is empty
  if (!req.body.directions || req.body.ingredients === '') {
    return res.status(400)
      .send({
        message: 'directions field cannot be empty',
        recipeData: req.body
      });
  }

  // check if directions field is empty
  if (!req.body.imageUrl || req.body.imageUrl === '') {
    return res.status(400)
      .send({
        message: 'imageUrl field cannot be empty',
        recipeData: req.body
      });
  }
  // check if views contains a negative value
  if (parseInt(req.body.views, 10) < 0) {
    return res.status(400)
      .send({
        message: 'views cannot be a negative number',
        recipeData: req.body
      });
  }
  // check if upvotes contains a negative value
  if (parseInt(req.body.upvotes, 10) < 0) {
    return res.status(400)
      .send({
        message: 'upvotes cannot be a negative number',
        recipeData: req.body
      });
  }
  // check if downvotes contains a negative value
  if (parseInt(req.body.downvotes, 10) < 0) {
    return res.status(400)
      .send({
        message: 'downvotes cannot be a negative number',
        recipeData: req.body
      });
  }
  // check if notification contains a negative value
  if (parseInt(req.body.notification, 10) < 0) {
    return res.status(400)
      .send({
        message: 'notification cannot be a negative number',
        recipeData: req.body
      });
  }
  return next();
};

/**
 * @module recipeExists
 * @description middleware function to check if recipe exists
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const recipeExists = (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.id, 10))) {
    return res.status(400).send({
      message: 'Invalid Id!'
    });
  }
  Recipe
    .find({ where: { id: req.params.id } })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send({
          status: 'fail',
          message: 'Recipe Not Found!'
        });
      }
      next();
    })
    .catch(error => res.status(500).send(error));
};

/**
 * @module userRecipeExists
 * @description middleware function to check if recipe exists
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const userRecipeExists = (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.id, 10))) {
    return res.status(400).send({
      message: 'Invalid Id!'
    });
  }
  Recipe
    .find({
      where: {
        id: req.params.id,
        userId: req.decoded.user.id
      }
    })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send({
          status: 'fail',
          message: 'Access Denied!'
        });
      }
      next();
    })
    .catch(error => res.status(500).send(error));
};

export { validateRecipeFields, recipeExists, userRecipeExists };
