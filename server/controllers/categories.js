import db from '../models/index';

//Assign variable to the database model
const Category = db.Category;
const User = db.User;
const keys = ['id', 'name'];

const categoriesController = {

  addUncategorized(req, res, next) {
    Category.findOne({
      where: {
        userId: req.decoded.user.id, name: 'uncategorized'
      }
    })
      .then((category) => {
        if (!category) {
          Category.create({
            name: 'uncategorized',
            userId: req.decoded.user.id,
          })
        }
        next();
      })
      .catch((error) => { res.status(400).send({ error: error.message }); });
  },
  addCategory(req, res) {
    Category.create({
      name: req.body.name,
      userId: req.decoded.user.id,
    })
      .then((category) => res.status(201).send({ 'message': 'Category created Successfully', 'categoryData': category }))
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  },
  getUserCategories(req, res) {
    //find all categories that have the requested username 
    return Category
      .findAll({
        where: { userId: req.decoded.user.id },
        attributes: keys
      })
      //retrieve all categories for that particular user
      .then((category) => {
        if (category) {
          if (category.length === 0) {
            res.status(404).send({ message: 'No category found for user' })
          } else {
            return res.status(200).send({ message: 'All User Categories Retrieved SuccessFullly!', userCategoryList: category });
          }
        }
      })
      .catch(error => res.status(400).send({ error: error.message }));
  }
};

export default categoriesController;
