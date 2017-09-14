import db from '../models/index';

//Assign variable to the database model
const Favorite = db.Favorite;

const favoriteExists = (req, res, next) => {
  Favorite
    .findOne({ where: { userId: req.decoded.user.id, recipeId: req.params.id } })
    .then((Favorite) => {
      if (Favorite) {
      	//if category doesnt exist, assign to uncategorized
        return res.status(400).send({
          status: 'fail',
          message: 'Recipe already favorited by user!'
        });
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};
export default favoriteExists;