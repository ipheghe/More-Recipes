import db from '../models/index';

// Reference database models
const { User, Recipe, Review } = db;
const keys = [
  'id', 'name', 'description', 'ingredients',
  'directions', 'imageUrl', 'views', 'upvotes', 'downvotes', 'notification'
];
let pageNumber;

const recipesController = {

  /**
   * @module addRecipe
   * @description controller function that creates recipe record
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message recipe
   */
  addRecipe(req, res) {
    // find if recipe Name exists
    Recipe.find({
      where: {
        userId: req.decoded.user.id,
        name: req.body.name
      }
    })
      .then((existingRecipeName) => {
        if (!existingRecipeName) {
          // logged-in user can add recipe
          Recipe.create({
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            directions: req.body.directions,
            imageUrl: req.body.imageUrl,
            views: 0,
            upvotes: 0,
            downvotes: 0,
            notification: 0,
            userId: req.decoded.user.id,
          })
            .then(recipe => res.status(201).send({
              message: 'Recipe Added SuccessFullly!',
              recipe
            }))
            .catch(error => res.status(401).send({
              error: error.message
            }));
        } else {
          return res.status(409).send({
            message: 'Recipe name exists!',
          });
        }
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  },

  /**
   * @module updateRecipe
   * @description controller function that updates recipe record
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message recipe
   */
  updateRecipe(req, res) {
    // find if recipe exits
    Recipe.find({
      where: {
        userId: req.decoded.user.id,
        id: req.params.id
      }
    })
      .then((recipe) => {
        // if recipe exists
        recipe.update({
          recipeName: req.body.recipeName || recipe.recipeName,
          recipeDesc: req.body.recipeDesc || recipe.recipeDesc,
          ingredients: req.body.ingredients || recipe.ingredients,
          directions: req.body.directions || recipe.directions,
          imageUrl: req.body.imageUrl || recipe.imageUrl,
          notification: req.body.notification || recipe.notification,
        })
          .then(updatedRecipe => res.status(200).send({
            message: 'Recipe Updated SuccessFullly!',
            recipe: updatedRecipe
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
   * @module deleteRecipe
   * @description controller function that deletes recipe record
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message recipeData
   */
  deleteRecipe(req, res) {
    return Recipe
      // find if recipe exits
      .find({
        where: {
          userId: req.decoded.user.id,
          id: req.params.id
        }
      })
      .then((recipe) => {
        // if recipe exits, delete the recipe
        recipe
          .destroy()
          .then(() => res.status(200).send({
            message: 'Recipe Deleted SuccessFullly!'
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
   * @module getUserRecipes
   * @description controller function that gets all recipes for a user
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message recipes
   */
  getUserRecipes(req, res) {
    const { limit, offset } = req.body;
    // find all recipes that have the requested userId
    return Recipe
      .findAndCountAll({
        where: {
          userId: req.decoded.user.id
        },
        attributes: keys,
        limit: limit || 6,
        offset: offset || 0
      })
      // retrieve all recipes for that particular user
      .then((recipes) => {
        if (recipes) {
          if (recipes.rows.length === 0) {
            res.send({
              message: 'No recipe found for user'
            });
          } else {
            pageNumber = parseInt(recipes.count, 10) / parseInt(limit || 6, 10);
            return res.status(200).send({
              message: 'All User Recipes Retrieved SuccessFullly!',
              recipes,
              pages: Math.ceil(pageNumber)
            });
          }
        }
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  },

  /**
   * @module viewRecipe
   * @description controller function that gets recipes by recipeId
   * and also increment views anytime recipe is viewed
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message recipeList
   */
  viewRecipe(req, res) {
    // Query database for recipe matching id in params
    return Recipe
      .findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: Review,
          as: 'reviews',
          attributes: ['message', 'createdAt'],
          include: [{
            model: User,
            attributes: ['username']
          }]
        }],
      })
      .then((recipe) => {
        // If found, increment the view count and return new data
        recipe.increment('views').then(() => {
          recipe.reload()
            .then(() => res.status(200).send({
              message: 'Recipe Retrieved SuccessFullly!',
              recipe
            }));
        });
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  },

  /**
   * @module getRecipe
   * @description controller function that gets a single recipe
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message recipe
   */
  getRecipe(req, res) {
    // Query database for recipe matching id in params
    return Recipe
      .findOne({
        where: {
          recipeName: req.params.recipeName
        }
      })
      .then((recipe) => {
        res.status(200).send({
          message: 'Recipe Retrieved SuccessFullly!',
          recipe
        });
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  },

  /**
   * @module getRecipes
   * @description controller function that gets all recipes
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Object} next - Express next middleware function
   * @return {object} message recipeData
   */
  getRecipes(req, res, next) {
    // If url path contains any of the query keys call the next function
    if (req.query.ingredients ||
      req.query.sort || req.query.search) return next();
    // Find all recipes and do an eagerload to include the reviews associated
    // with each recipe and also to include the user whomposted the review
    return Recipe
      .findAll({
        // Return only attributes defined in the global scope
        attributes: keys
      })
      .then(recipes => res.status(200).send({
        message: 'All Recipes Retrieved SuccessFullly!',
        recipes
      }))
      .catch(error => res.status(500).send({
        error: error.message
      }));
  },

  /**
   * @module getTopRecipes
   * @description controller function that gets all recipes and sorts them by highest upvotes
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Object} next - Express next middleware function
   * @return {object} message recipes
   */
  getTopRecipes(req, res, next) {
    const { limit, offset } = req.body;
    // If query key does not match sort, call next on the next handler
    if (!req.query.sort) return next();
    // Take the query key and slice order string to get desc
    // which is used to order by descending
    const { sort } = req.query,
      order = (req.query.order).slice(0, 4);
    return Recipe
      .findAndCountAll({
        attributes: keys,
        order: [
          [sort, order]
        ],
        limit: limit || 6,
        offset: offset || 0
      })
      .then((recipes) => {
        if (recipes.rows.length === 0) {
          res.status(404).send({ message: 'No recipe available' });
        } else {
          pageNumber = parseInt(recipes.count, 10) / parseInt(limit || 6, 10);
          return res.status(200).send({
            message: 'All Top Recipes Retrieved SuccessFullly!',
            recipes,
            pages: Math.ceil(pageNumber)
          });
        }
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  },

  /**
   * @module searchRecipesByIngredients
   * @description controller function that searches for recipes by ingredients
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Object} next - Express next middleware function
   * @return {object} message recipes
   */
  searchRecipesByIngredients(req, res, next) {
    const { limit, offset } = req.body;

    // If query key does not match ingredients, call next on the next handler
    if (!req.query.ingredients) return next();

    // if multiple ingredients are present, split by the comma
    const ingredients = req.query.ingredients.split(',');

    // If multiple ingredients are present, map each keyword to an object and use
    // the $or and $iLike for case insensitivity sequelize complex query to perform search
    const query = ingredients.map(keyword => ({
      ingredients: {
        $iLike: `%${keyword}%`
      }
    }));
    return Recipe
      .findAndCountAll({
        where: {
          $or: query
        },
        attributes: keys,
        limit: limit || 6,
        offset: offset || 0
      })
      .then((recipes) => {
        if (recipes.rows.length === 0) {
          return res.status(200).send({
            message: 'No recipe matches your search'
          });
        }
        pageNumber = parseInt(recipes.count, 10) / parseInt(limit || 6, 10);
        return res.status(200).send({
          message: 'Recipes Retrieved SuccessFullly!',
          recipes,
          pages: Math.ceil(pageNumber)
        });
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  },

  /**
   * @module searchRecipes
   * @description controller function that searches for recipes by keyword inputed
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Object} next - Express next middleware function
   * @return {object} message recipes
   */
  searchRecipes(req, res, next) {
    const { limit, offset } = req.body;

    // If query key does not match ingredients, call next on the next handler
    if (!req.query.search) return next();

    // if multiple keywords are present, split by the comma
    const search = req.query.search.split(',');

    // collects the keyword and searches if it is present
    // in ingredients or recipeName or recipeDescription
    const query = search.map(word => ({
      ingredients: {
        $iLike: `%${word}%`
      }
    }));
    const query1 = search.map(word => ({
      name: {
        $iLike: `%${word}%`
      }
    }));
    const query2 = search.map(word => ({
      description: {
        $iLike: `%${word}%`
      }
    }));
    return Recipe
      .findAndCountAll({
        where: {
          $or: [{
            $or: query
          },
          {
            $or: query1
          },
          {
            $or: query2
          }
          ]
        },
        attributes: keys,
        limit: limit || 6,
        offset: offset || 0
      })
      .then((recipes) => {
        if (recipes.rows.length === 0) {
          return res.status(200).send({
            message: 'Sorry!!! No recipe matches your search'
          });
        }
        pageNumber = parseInt(recipes.count, 10) / parseInt(limit || 6, 10);
        return res.status(200).send({
          message: 'Search result retrieved successfully!',
          recipes,
          pages: Math.ceil(pageNumber)
        });
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  }
};
export default recipesController;
