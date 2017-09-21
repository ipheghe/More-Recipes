import db from '../models/index';

// Reference database models
const Recipe = db.Recipe;
const Vote = db.Vote;

const votesController = {
  upvote(req, res, next){
    //check if user selected downvotes
    if (req.query.sort === 'downvotes') return next();
    // find if user have voted, if user have note voted, create a vote record for user
    Vote.findOrCreate({
    where: {
      userId: req.decoded.user.id,
      recipeId: req.params.id },
    defaults: { option: true }
    })
    .spread((voter, created) => {
      // If created perform upvote action
      // If not created and user has information resolving
      // to a downvote, allow user to upvote and remove user downvote
      if (created) {
        return Recipe
          .findOne({ where: { id: req.params.id } })
          .then((recipe) => {
            recipe.increment('upvotes').then(() => {
              recipe.reload().then(() => res.status(200).send({
                status: 'success',
                message: 'Your vote has been recorded',
                upvote: recipe.upvotes,
                downvote: recipe.downvotes
              }));
            });
          });
      } else if (!created && voter.option === false) {
        voter.update({ option: true });
        return Recipe
          .findOne({ where: { id: req.params.id } })
          .then((recipe) => {
            recipe.increment('upvotes').then(() => {
              recipe.decrement('downvotes').then(() => {
                recipe.reload();
              }).then(() => res.status(200).send({
                status: 'success',
                message: 'Your vote has been recorded',
                upvote: recipe.upvotes,
                downvote: recipe.downvotes
              }));
            });
          });
      } else if (!created && voter.option === true) {
        voter.destroy();
        return Recipe
          .findOne({ where: { id: req.params.id } })
          .then((recipe) => {
            recipe.decrement('upvotes').then(() => {
              recipe.reload();
            }).then(() => res.status(200).send({
              status: 'success',
              message: 'Your vote has been removed',
              upvote: recipe.upvotes,
              downvote: recipe.downvotes
            }));
          });
      }
    })
    .catch(error => res.status(400).send(error));
  },
  downvote(req, res) {
  // if user selected downvote action
    if (req.query.sort === 'downvotes') {
   // find if user have voted, if user have note voted, create a vote record for user
      Vote.findOrCreate({
        where: {
          userId: req.decoded.user.id,
          recipeId: req.params.id },
        defaults: { option: false }
      })
      .spread((voter, created) => {
        // If created perform downvote action
        // If not created and user has information resolving
        // to an upvote, allow user to downvote and remove user's upvote
        if (created) {
          return Recipe
            .findOne({ where: { id: req.params.id } })
            .then((recipe) => {
              recipe.increment('downvotes').then(() => {
                recipe.reload().then(() => res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upvotes,
                  downvote: recipe.downvotes
                }));
              });
            });
        } else if (!created && voter.option === true) {
          voter.update({ option: false });
          return Recipe
            .findOne({ where: { id: req.params.id } })
            .then((recipe) => {
              recipe.increment('downvotes').then(() => {
                recipe.decrement('upvotes').then(() => {
                  recipe.reload();
                }).then(() => res.status(200).send({
                  status: 'success',
                  message: 'Your vote has been recorded',
                  upvote: recipe.upvotes,
                  downvote: recipe.downvotes
                }));
              });
            });
        } else if (!created && voter.option === false) {
          voter.destroy();
          return Recipe
            .findOne({ where: { id: req.params.id } })
            .then((recipe) => {
              recipe.decrement('downvotes').then(() => {
                recipe.reload();
              }).then(() => res.status(200).send({
                status: 'success',
                message: 'Your vote has been removed',
                upvote: recipe.upvotes,
                downvote: recipe.downvotes
              }));
            });
        }
      })
      .catch(error => res.status(400).send(error));
    }
  }
};
export default votesController;