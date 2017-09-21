import db from '../models/index';

//Assign variable to the database model
const Favorite = db.Favorite;
const Category = db.Category;
const User = db.User;
const Recipe = db.Recipe;

const keys = [];

const favoritesController = {

  addFavorites(req, res){
    //user is found then recipe can be added to favorites
    Favorite.create({
          recipeId: req.params.id,
          categoryId: req.params.categoryId ,
          userId: req.decoded.user.id
    })
      .then((favorite) => res.status(201).send({ 'message': 'Recipe added to favorites Successfully', 'favoriteData': favorite }))
      .catch((error) => {
        res.status(400).send({error: error.message});
      });
  },
  retrieveFavorites(req, res){
    //find all recipes that have the requested username 
    Favorite.findAll({ 
      where: { userId: req.decoded.user.id}, 
      include: [{
        model: Recipe, 
        attributes: ['recipeName','recipeDescription','ingredients','directions'],
              include: [{
        model: User,
        attributes: ['username']
      }]
      }],
      attributes: keys
    })
    //retrieve all recipes for that particular user
    .then((favorite) => {
      if (favorite) {
        if(favorite.length === 0){
           res.send({message: 'There are no favourite recipe for this user'})
        }else{
          return res.status(200).send({ 'message': 'User Favorite recipes retrieved Successfully', 'userFavorites': favorite });
        }
      } 
    })
    .catch(error => res.status(400).send({error: error.message}));
  }
};
export default favoritesController;