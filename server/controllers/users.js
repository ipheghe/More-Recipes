import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = db.User;
const salt = bcrypt.genSaltSync(10);

//user signup & signin controller
const usersController = {

  signup(req, res){

    User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt, null), //hash password
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email
    }) 
    .then((user) => {
      return res.status(201).send({"message": 'User account successfully created.','userData': user });
    })   
    .catch(error => res.status(400).send({'error': error.message}));
  },

  signin(req, res){
      //check if username field is empty
    if (!req.body.username || req.body.username.trim() === '' ) {
          return res.status(400).send({'error': false, 'message': 'username field cannot be empty', 'userData': req.body});
     }
     //check if password field is empty
    if (!req.body.password || req.body.password.trim() === '') {
          return res.status(400).send({'error': false, 'message': 'password field cannot be empty', 'userData': req.body});
    }

    // check if the username exists
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          res.status(404).send({'message': 'Authentication failed. Username is incorrect or does not exist'});//username doesnt exist
        } else if (user) {
          // check if password matches
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            res.status(404).send({
            'error': true, 'message': 'Authentication failed. Incorrect password' });
          } else {
            // User is found and password is correct
            // create a token for authentication
            const token = jwt.sign({ user }, 'secretPassword', {
              expiresIn: '6h' // expires in 6 hours
            });
            // return success message including token in JSON format
            res.status(200).send({
              'message': 'Authentication & Login successful', 'authToken': token, 'userData': user
            });
          }
        }
      })
    .catch(err => res.status(400).send('Login Failed, Please re-confirm details'));  
  },
  // get user details
  userExists(req, res) {
  return User
    .findOne({ where: { username: req.params.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({message: 'User doesnt exist'})
      }
      return res.status(200).send({message: 'User Exists!', userData: user})
    })
    .catch(error => res.status(400).send({error: error.message}));
  }
};
export default usersController;
