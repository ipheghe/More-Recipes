import db from '../models/index';

// Assign variable to the database model
const { User, Recipe, Favorite } = db;

const keys = [];

const favoritesController = {

/**
 * @module addFavorites
 * @description controller function that creates recipe favorited record
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {object} message favoriteData
 */
  addFavorites(req, res) {
    // user is found then recipe can be added to favorites
    Favorite.create({
      recipeId: req.params.id,
      categoryId: req.params.categoryId,
      userId: req.decoded.user.id
    })
      .then(favorite => res.status(201).send({
        message: 'Recipe added to favorites Successfully',
        favoriteData: favorite
      }))
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  },

  /**
   * @module unFavoriteRecipe
   * @description controller function that unfavorites recipe
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message favoriteData
   */
  unFavoriteRecipe(req, res) {
    return Favorite
      // find if recipe exits
      .findOne({
        where: {
          userId: req.decoded.user.id,
          recipeId: req.params.id
        }
      })
      .then((favorite) => {
        // if recipe exits, delete the recipe
        favorite
          .destroy()
          .then(unfavoritedRecipe => res.status(200).send({
            message: 'Recipe Unfavorited SuccessFullly!',
            favoriteData: unfavoritedRecipe
          }))
          .catch(error => res.status(400).send({
            error: error.message
          }));
      })
      .catch(error => res.status(400).send({
        error: error.message
      }));
  },

  /**
   * @module retrieveFavorites
   * @description controller function that retrieves all usere favorite recipes
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message userFavorite
   */
  retrieveFavorite(req, res) {
    // find all recipes that have the requested username
    Favorite.findOne({
      where: { userId: req.decoded.user.id, recipeId: req.params.id },
      include: [{
        model: Recipe,
        include: [{
          model: User,
          attributes: ['username']
        }]
      }],
      attributes: keys
    })
      // retrieve all recipes for that particular user
      .then((favorite) => {
        if (favorite) {
          if (favorite.length === 0) {
            res.send({ message: 'User has not favorited this recipe' });
          } else {
            return res.status(200).send({
              message: 'User Favorite recipe retrieved Successfully',
              userFavorite: favorite
            });
          }
        }
      })
      .catch(error => res.status(400).send({ error: error.message }));
  },

  /**
   * @module retrieveFavorites
   * @description controller function that retrieves all usere favorite recipes
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message userFavorites
   */
  retrieveFavorites(req, res) {
    // find all recipes that have the requested username
    Favorite.findAll({
      where: { userId: req.decoded.user.id },
      include: [{
        model: Recipe,
        include: [{
          model: User,
          attributes: ['username']
        }]
      }],
      attributes: keys
    })
      // retrieve all recipes for that particular user
      .then((favorite) => {
        if (favorite) {
          if (favorite.length === 0) {
            res.send({ message: 'There are no favourite recipe for this user' });
          } else {
            return res.status(200).send({
              message: 'User Favorite recipes retrieved Successfully',
              userFavorites: favorite
            });
          }
        }
      })
      .catch(error => res.status(400).send({ error: error.message }));
  }
};
export default favoritesController;
