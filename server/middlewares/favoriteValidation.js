import db from '../models';

// Assign variable to the database model
const { Favorite } = db;

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
    .findOne({
      where: {
        userId: req.decoded.user.id,
        recipeId: req.params.id
      }
    })
    .then((favorite) => {
      if (favorite) {
        // if user has already favorited recipe
        return res.send({
          status: 'fail',
          message: 'Recipe already favorited by user!'
        });
      }
      next();
    })
    .catch(error => res.status(401).send(error));
};

export default favoriteExists;
