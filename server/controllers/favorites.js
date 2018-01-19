import db from '../models/index';

// Assign variable to the database model
const { User, Recipe, Favorite } = db;
const keys = [];
let pageNumber;

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
        favorite
      }))
      .catch((error) => {
        res.status(401).send({ error: error.message });
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
          .then(() => res.status(200).send({
            message: 'Recipe Unfavorited SuccessFullly!',
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
   * @module retrieveFavorites
   * @description controller function that retrieves all usere favorite recipes
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message userFavorite
   */
  retrieveFavorite(req, res) {
    // find recipe that have the requested userId and recipeId
    Favorite.findAll({
      where: { userId: req.decoded.user.id, recipeId: req.params.id },
      attributes: keys
    })
      // retrieve favorite recipe for that particular user
      .then((favorite) => {
        if (favorite) {
          if (favorite.length < 1) {
            res.send({
              status: false,
              message: 'User has not favorited this recipe'
            });
          } else {
            return res.status(200).send({
              status: true,
              message: 'User Favorite recipe retrieved Successfully',
              userFavorite: favorite
            });
          }
        }
      })
      .catch(error => res.status(500).send({ error: error.message }));
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
    const { limit, offset } = req.body;
    // find all favotited recipes that have the requested username
    Favorite.findAndCountAll({
      where: { userId: req.decoded.user.id },
      include: [{
        model: Recipe,
        include: [{
          model: User,
          attributes: ['username']
        }]
      }],
      attributes: keys,
      limit: limit || 6,
      offset: offset || 0
    })
      // retrieve all favorite recipes for that particular user
      .then((favorites) => {
        if (favorites) {
          if (favorites.rows.length === 0) {
            res.send({ message: 'There are no favourite recipe for this user' });
          } else {
            pageNumber = parseInt(favorites.count, 10) / parseInt(limit || 6, 10);
            return res.status(200).send({
              message: 'User Favorite recipes retrieved Successfully',
              userFavorites: favorites,
              pages: Math.ceil(pageNumber)
            });
          }
        }
      })
      .catch(error => res.status(500).send({ error: error.message }));
  }
};
export default favoritesController;
