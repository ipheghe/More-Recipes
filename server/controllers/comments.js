const Comment = require('../models').Comment;
const Recipe = require('../models').Recipe;


module.exports.create = (req, res) => {

    //check if password field is empty
    if (!req.body.comment) {
      return res.status(400)
      .send({
        error: { message: 'comment field cannot be empty' },
        commentData: req.body
      });
    }
  //find if recipe is availabe before review can be posted on it
  Recipe.findOne({ where: { recipeId: parseInt(req.params.recipeId) } })
    .then((recipe) => {
      //if recipe is not found
      if (!recipe) {
        res.send({error: { message: 'Recipe does not exist' }});
      } else {
        //recipe is found then review can be posted for it
        Comment.create({
              comment: req.body.comment,
              recipeId: parseInt(req.params.recipeId),
              commentBy: req.body.commentBy,
        })
          .then((review) => res.status(201).send({ message: 'Recipe does not exist', userData: review }))
          .catch((error) => {
            res.status(400).send({error: error.message});
          });
      }
    });
};

