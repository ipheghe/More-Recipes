import db from '../models/index';

// Assign variable to the database model
const Category = db.Category;

/**
 * @module validateCategoryField
 * @description middleware function to validate catregory field
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const validateCategoryField = (req, res, next) => {
  // check if category name field is empty
  if (!req.body.name || req.body.name === '') {
    return res.status(400)
      .send({
        message: 'category name field cannot be empty'
      });
  }
  return next();
};

/**
 * @module categoryExists
 * @description middleware function to check if category exists
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const categoryExists = (req, res, next) => {
  Category
    .find({ where: { id: req.params.categoryId } })
    .then((category) => {
      // if category doesnt exist
      if (!category) {
        // find the id for uncategorized and place the favorite recipe under it
        Category.findOne({
          where: {
            userId: req.decoded.user.id, name: 'uncategorized'
          }
        })
          .then((newCategory) => {
            req.params.categoryId = newCategory.id;
          });
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};

export { validateCategoryField, categoryExists };
