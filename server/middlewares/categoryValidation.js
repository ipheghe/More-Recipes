import { Category } from '../models';

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
  if (Number.isNaN(parseInt(req.params.categoryId || req.params.id, 10))) {
    return res.status(400).send({
      message: 'Invalid Id!'
    });
  }
  Category
    .find({
      where: {
        id: req.params.categoryId || req.params.id,
      }
    })
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          status: 'fail',
          message: 'Category Not Found!'
        });
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};

/**
 * @module userCategoryExists
 * @description middleware function to check if user category exists
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const userCategoryExists = (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.id, 10))) {
    return res.status(400).send({
      message: 'Invalid Id!'
    });
  }
  Category
    .find({
      where: {
        id: req.params.id,
        userId: req.decoded.user.id
      }
    })
    .then((category) => {
      if (!category) {
        return res.status(401).send({
          status: 'fail',
          message: 'Access Denied!'
        });
      }
      next();
    })
    .catch(error => res.status(500).send(error));
};

export { validateCategoryField, categoryExists, userCategoryExists };
