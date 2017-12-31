import db from '../models/index';

// Assign variable to the database model
const { Category } = db;
const keys = ['id', 'name'];

const categoriesController = {

/**
 * @module addUncategorized
 * @description controller function that creates uncategorized category
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
  addUncategorized(req, res, next) {
    Category.findOne({
      where: {
        userId: req.decoded.user.id, name: 'uncategorized'
      }
    })
      .then((category) => {
        if (!category) {
          Category.create({
            name: 'uncategorized',
            userId: req.decoded.user.id,
          });
        }
        next();
      })
      .catch((error) => { res.status(401).send({ error: error.message }); });
  },

  /**
 * @module addCategory
 * @description controller function that creates category
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {object} message categoryData
 */
  addCategory(req, res) {
    Category.create({
      name: req.body.name,
      userId: req.decoded.user.id,
    })
      .then(category => res.status(201).send({
        message: 'Category created Successfully',
        category
      }))
      .catch((error) => {
        res.status(401).send({ error: error.message });
      });
  },

  /**
   * @module updateCategory
   * @description controller function that updates category name
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message userData
   */
  updateCategory(req, res) {
    return Category
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then((category) => {
        // f user exists
        category.update({
          name: req.body.name || category.name
        })
          .then(updatedCategory => res.status(200).send({
            message: 'category name changed SuccessFullly!',
            category: updatedCategory
          }))
          .catch(error => res.status(401).send({
            error: error.message
          }));
      })
      .catch(err => res.status(500).send({
        error: err.message
      }));
  },

  /**
   * @module deleteCategory
   * @description controller function that deletes category record
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message favoriteData
   */
  deleteCategory(req, res) {
    return Category
      // find if recipe exits
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then((category) => {
        // if category exits, delete the recipe
        category
          .destroy()
          .then(() => res.status(200).send({
            message: 'Category deleted SuccessFullly!',
          }))
          .catch(error => res.status(401).send({
            error: error.message
          }));
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  },

  /**
 * @module getUserCategories
 * @description controller function that gets all user categories
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {object} message userCategoryList
 */
  getUserCategories(req, res) {
    // find all categories belonging to user
    return Category
      .findAll({
        where: { userId: req.decoded.user.id },
        attributes: keys
      })
      // retrieve all categories for that particular user
      .then((userCategories) => {
        if (userCategories) {
          if (userCategories.length === 0) {
            res.status(200).send({ message: 'No category found for user' });
          } else {
            return res.status(200).send({
              message: 'All User Categories Retrieved SuccessFullly!',
              userCategories
            });
          }
        }
      })
      .catch(error => res.status(400).send({ error: error.message }));
  },

  /**
   * @module getUserCategory
   * @description controller function that gets a user category
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message userCategoryList
   */
  getUserCategory(req, res) {
    // find a category for a user
    return Category
      .findAll({
        where: {
          id: req.params.id,
          userId: req.decoded.user.id
        },
        attributes: keys
      })
      // retrieve category for that particular user
      .then((userCategory) => {
        if (userCategory) {
          if (!userCategory) {
            res.status(404).send({ message: 'No category found for user' });
          } else {
            return res.status(200).send({
              message: 'User Category Retrieved SuccessFullly!',
              userCategory
            });
          }
        }
      })
      .catch(error => res.status(500).send({ error: error.message }));
  }
};

export default categoriesController;
