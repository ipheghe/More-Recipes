import db from '../models/index';

//Assign variable to the database model
const Category = db.Category;
const User = db.User;

const categoriesController = {

  addUncategorized(req, res, next){
    Category.findOne({where: {
        userId: req.decoded.user.id, name: 'uncategorized' }})
      .then((category) => {
        if(!category) {
          Category.create({
          name: 'uncategorized',
          userId: req.decoded.user.id,
         })
        }
         next();
      })
      .catch((error) => {res.status(400).send({error: error.message});});
  },
  addCategory(req, res){
    Category.create({
      name: req.body.name,
      userId: req.decoded.user.id,
    })
    .then((category) => res.status(201).send({ 'message': 'Category created Successfully', 'categoryData': category }))
    .catch((error) => {
      res.status(400).send({error: error.message});
    });
  }
};

export default categoriesController;
