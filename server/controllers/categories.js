const Category = require('../models').Category;
const User = require('../models').User;


const categoriesController = {

  create(req, res){

    //check if password field is empty
    if (!req.body.name || req.body.name.trim() === '') {
      return res.status(400)
      .send({'message': 'category name field cannot be empty',
        'categoryData': req.body
      });
    }
    //find if recipe is availabe before review can be posted on it
    User.findOne({ where: { id: req.params.userId } })
      .then((user) => {
        //if recipe is not found
        if (!user) {
          res.status(400).send({'message': 'User does not exist' });
        } else {
          //recipe is found then review can be posted for it
          Category.create({
                name: req.body.name,
                userId: req.params.userId,
          })
            .then((category) => res.status(201).send({ 'message': 'Category created Successfully', 'categoryData': category }))
            .catch((error) => {
              res.status(400).send({error: error.message});
            });
        }
      });

  }
};

export default categoriesController;
