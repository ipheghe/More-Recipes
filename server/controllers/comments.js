const Comment = require('../models').Comment;
const Recipe = require('../models').Recipe;


module.exports.create = (req, res) => {

  //find if recipe is availabe before review can be posted on it
  Recipe.findOne({ where: { recipeId: parseInt(req.params.recipeId) } })
    .then((recipe) => {
      //if recipe is not found
      if (!recipe) {
        res.send('No recipe found');
      } else {
        //recipe is found then review can be posted for it
        Comment.create({
              comment: req.body.comment,
              recipeId: parseInt(req.params.recipeId),
              commentBy: req.body.commentBy,
        })
          .then(() => res.status(201).send('New review posted'))
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    });
};

