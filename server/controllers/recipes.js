const Recipe = require('../models').Recipe;

module.exports = {
  create(req, res) {

      //Give any image name here.
    //let imageData = fs.readFileSync('./egusi_soup.jpg');
    return Recipe
    // logged-in user can add recipe
      .create({
          recipeName: req.body.recipeName,
          recipeDesc: req.body.recipeDesc,
          ingredients: req.body.ingredients,
          directions: req.body.directions,
          image: "defaultImage",
          views: parseInt(req.body.views),
          upvotes: parseInt(req.body.upvotes),
          downvotes: parseInt(req.body.downvotes),
          notification: parseInt(req.body.notification),
          postedBy: req.body.postedBy,
      })
      .then(recipe => res.status(201).send('Recipe Added'))
      .catch(error => res.status(400).send(error));
  },
};

