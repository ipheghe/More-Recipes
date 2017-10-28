import db from '../models/index';

// Reference database models
const Recipe = db.Recipe;
const Review = db.Review;
const User = db.User;
const keys = [
  'id', 'recipeName', 'recipeDescription', 'ingredients',
  'directions', 'imageUrl', 'views', 'upvotes', 'downvotes', 'notification'
];

const recipesController = {
  // add recipe record
  create(req, res) {
    return Recipe
      // logged-in user can add recipe
      .create({
        recipeName: req.body.recipeName,
        recipeDescription: req.body.recipeDescription,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        imageUrl: req.body.imageUrl,
        views: 0,
        upvotes: 0,
        downvotes: 0,
        notification: 0,
        userId: req.decoded.user.id,
      })
      .then(recipe => res.status(201).send({ 'message': 'Recipe Added SuccessFullly!', 'recipeData': recipe }))
      .catch(error => res.status(400).send({ 'error': error.message }));
  },
  //update recipe record
  update(req, res) {
    //find if recipe exits
    Recipe.find({
      where: {
        userId: req.decoded.user.id, id: req.params.id
      }
    })
      .then(recipe => {
        //if recipe exists
        recipe.update({
          recipeName: req.body.recipeName || recipe.recipeName,
          recipeDesc: req.body.recipeDesc || recipe.recipeDesc,
          ingredients: req.body.ingredients || recipe.ingredients,
          directions: req.body.directions || recipe.directions,
          imageUrl: req.body.imageUrl || recipe.imageUrl,
          notification: parseInt(req.body.notification) || recipe.notification,
        })
          .then(updatedRecipe => res.status(200).send({ message: 'Recipe Updated SuccessFullly!', recipeData: recipe }))
      })
      .catch(error => res.status(400).send({ error: error.message }));
  },
  //delete recipe record 
  destroy(req, res) {
    return Recipe
      //find if recipe exits
      .find({ where: { userId: req.decoded.user.id, id: req.params.id } })
      .then(recipe => {
        //if recipe exits, delete the recipe
        return recipe
          .destroy()
          .then((deleted) => res.status(200).send({ 'message': 'Recipe Deleted SuccessFullly!' }))
          .catch(error => res.status(400).send({ error: error.message }));
      })
      .catch(error => res.status(400).send({ error: error.message }));
  },
  // Get user personal recipes 
  getUserRecipes(req, res) {
    //find all recipes that have the requested username 
    return Recipe
      .findAll({
        where: { userId: req.decoded.user.id },
        attributes: keys
      })
      //retrieve all recipes for that particular user
      .then((recipe) => {
        if (recipe) {
          if (recipe.length === 0) {
            res.status(404).send({ message: 'No recipe found for user' })
          } else {
            return res.status(200).send({ message: 'All User Recipes Retrieved SuccessFullly!', userRecipeList: recipe });
          }
        }
      })
      .catch(error => res.status(400).send({ error: error.message }));
  },
  // Get recipes by recipeId and also increment views anytime recipe is viewed
  viewRecipe(req, res) {
    // Query database for recipe matching id in params
    return Recipe
      .findOne({ where: { id: req.params.id }, include: [{
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
            .then(() => res.status(200).send({ message: 'Recipe Retrieved SuccessFullly!', recipeList: recipe }));
        });
      })
      .catch(error => res.status(400).send({ error: error.message }));
  },
  // Get recipes by recipeId and also increment views anytime recipe is viewed
  getRecipe(req, res) {
    // Query database for recipe matching id in params
    return Recipe
      .findOne({ where: { recipeName: req.params.recipeName } })
      .then((recipe) => {
        res.status(200).send({ message: 'Recipe Retrieved SuccessFullly!', recipe: recipe })
      })
      .catch(error => res.status(400).send({ error: error.message }));
  },
  // get all recipes
  getRecipes(req, res, next) {
    // If url path contains any of the query keys call the next function
    if (req.query.ingredients ||
      req.query.sort) return next();
    // Find all recipes and do an eagerload to include the reviews associated
    // with each recipe and also to include the user whomposted the review
    return Recipe
      .all({
        include: [{
          model: Review,
          as: 'reviews',
          attributes: ['message'],
          include: [{
            model: User,
            attributes: ['username']
          }]
        }],
        // Return only attributes defined in the global scope
        attributes: keys
      })
      .then(recipe => res.status(200).send({ message: 'All Recipes Retrieved SuccessFullly!', recipeData: recipe }))
      .catch(error => res.status(400).send({ error: error.message }));
  },
  //get recipes with most upvotes
  getTopRecipes(req, res, next) {
    // If query key does not match sort, call next on the next handler
    if (!req.query.sort) return next();
    // Take the query key and slice order string to get desc
    // which is used to order by descending
    const sort = req.query.sort,
      order = (req.query.order).slice(0, 4);
    return Recipe
      .findAll({
        attributes: keys,
        order: [[sort, order]],
        limit: 10
      })
      .then(recipe => res.status(200).send({ message: 'All Top Recipes Retrieved SuccessFullly!', recipeData: recipe }))
      .catch(error => res.status(400).send({ error: error.message }));
  },
  // search recipes by ingredients
  searchRecipesByIngredients(req, res, next) {
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
      .all({
        where: { $or: query },
        limit: 10,
        attributes: keys
      })
      .then((recipe) => {
        if (!recipe.length) {
          return res.status(200).send({
            message: 'No recipe matches your search'
          });
        }
        return res.status(200).send({ message: 'Recipes Retrieved SuccessFullly!', recipeData: recipe });
      })
      .catch(error => res.status(400).send({ error: error.message }));
  },
    // search recipes by ingredients
    searchRecipes(req, res, next) {
      // If query key does not match ingredients, call next on the next handler
      if (!req.query.search) return next();
  
      // if multiple ingredients are present, split by the comma
      const search = req.query.search.split(',');
  
      // If multiple ingredients are present, map each keyword to an object and use
      // the $or and $iLike for case insensitivity sequelize complex query to perform search
      const query = search.map(word => ({
        ingredients: {
          $iLike: `%${word}%`
        }
      }));
      const query1 = search.map(word => ({
        recipeName: {
          $iLike: `%${word}%`
        }
      }));
      const query2= search.map(word => ({
        recipeDescription: {
          $iLike: `%${word}%`
        }
      }));
      return Recipe
        .all({
          where: { $or: query },
          limit: 2,
          attributes: keys
        })
        .then((recipe) => {
          if (!recipe.length) {
            return res.status(200).send({
              message: 'No recipe matches your search'
            });
          }
          return res.status(200).send({ message: 'Recipes Retrieved!', recipeData: recipe });
        })
        .catch(error => res.status(400).send({ error: error.message }));
    }
};
export default recipesController;
