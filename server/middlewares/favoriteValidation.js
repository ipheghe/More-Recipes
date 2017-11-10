import db from '../models/index';

// Assign variable to the database model
const Favorite = db.Favorite;

/**
 * @module favoriteExists
 * @description middleware function to check if favorite recipe exists
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const favoriteExists = (req, res, next) => {
  Favorite
    .findOne({ where: { userId: req.decoded.user.id, recipeId: req.params.id } })
    .then((favorite) => {
      if (favorite) {
        // if category doesnt exist, assign to uncategorized
        return res.status(400).send({
          status: 'fail',
          message: 'Recipe already favorited by user!'
        });
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};

export default favoriteExists;
