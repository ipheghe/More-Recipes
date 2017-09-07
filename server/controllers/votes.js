const Vote = require('../models').Vote;
const User = require('../models').User;
const Recipe = require('../models').Recipe;
const Sequelize = require('sequelize');


const votesController = {

  create(req, res){

    return User
   .findOne({ where: { id: req.params.userId } })
    .then((user) => {
      //if user is not found
      if (!user) {
        res.send({error: { message: 'User does not exist' }});
      } else {

        //find if recipe is availabe 
        return Recipe
        .findOne({ where: { id: req.params.recipeId } })
           .then((recipe) => {
      //if recipe is not found
            if (!recipe) {
              res.send({error: { message: 'Recipe does not exist' }});
            } else {
              return Vote
                 .findOne({ where: { userId: req.params.userId, $and: { recipeId: req.params.recipeId } } })
                 .then((vote) => {
                    if(!vote){
                        //recipe is found then review can be posted for it
                        return Vote
                        .create({
                              views: 1,
                              upvotes: 0,
                              downvotes: 0,
                              userId: req.params.userId,
                              recipeId: req.params.recipeId,
                        })
                          .then((category) => res.status(201).send({ 'message': 'Vote created Successfully', 'categoryData': category }))
                          .catch((error) => {
                            res.status(400).send({error: error.message});
                          });

                    }

                 })
                .catch((error) => {res.status(400).send({error: error.message})});
              }
      })
    }

  })
  },
  update(req,res){

          //    if (req.query.sort){

          let sort = req.query.sort;

          let valid = checkUpvotes(sort);
          let valid2 = checkDownvotes(sort);
          console.log(valid,valid2);
          return Vote
               .findOne({ where: { userId: req.params.userId, $and: { recipeId: req.params.recipeId } } })
                 .then((vote) => {

                    if (!vote) {
                         res.send({error: { message: 'No Vote Records exist' }});

                    }
                    else if(vote){
                        //recipe is found then review can be posted for it
                        return vote
                        .update({
                              upvotes: valid ,
                              downvotes: valid2 ,
                        })
                          .then((recipeVote) => {
                              if(recipeVote){

                                
                                Vote.findAll({ where: { recipeId: req.params.recipeId} })
                                    .then((votes) => {
                                      // count votes

                                      const upVoteCount = Vote.sum('upvotes');
                                      const downVoteCount = Vote.sum('downvotes');
                                      console.log(upVoteCount,downVoteCount);
                                      return { upVoteCount, downVoteCount };
                                    })
                                 .then((succcess) => {
                                     return Recipe
                                        .find({where: {id: req.params.recipeId,}})
                                          .then(recipe => {
                                            return recipe
                                            .update({ upvotes: succcess.upVoteCount, downvotes: succcess.downVoteCount })
                                            .then(voteSuccess => res.status(201).send({ 'message': 'Votes updated Successfully', 'recipeVote': voteSuccess }))
                                            .catch(error => res.status(400).send({error: error.message}));})
                                        })
                                 .catch((error) => {res.status(400).send({error: error.message}); });
                              }
                            })
                          .catch((error) => {res.status(400).send({error: error.message}); });

                    }

             else{

                      return res.status(201).send({ 'message': 'No action performed'});
              }
          })
     },
};
  export default votesController;


let checkUpvotes = (n) => {

    if (n === 'upvotes'){

        return 1;
    }
    else {

        return 0;
    }
};

let checkDownvotes = (n) => {

    if(n==='downvotes') {

        return 1;
    }
    else {

        return 0;
    }
};