const User = require('../models').User;
const bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';
const salt = bcrypt.genSaltSync(10);

//signup controller
module.exports.signup = (req, res) => {

//validate user fields

console.log(req.body);
  let valid = validateUser(req,res);

 if(!valid){

      User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt, null), //hash password
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email
   })
// 
    .then((user) => {

      return res.status(200).send({"message": 'User account successfully created.','userData': user });
      //console.log(res.status);
    })
  
    .catch(error => res.status(400).send({'error': error.message}));
 }

};

//signin Controller
module.exports.signin = (req, res) => {

      //check if username field is empty
    if (!req.body.username || req.body.username.trim() === '' ) {
          return res.status(400).send({'error': false, 'message': 'username field cannot be empty', 'userData': req.body});
     }
     //check if password field is empty
    if (!req.body.password || req.body.password.trim() === '') {
          return res.status(400).send({'error': false, 'message': 'password field cannot be empty', 'userData': req.body});
    }

  // Find the user
  User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          res.status(404).send({'message': 'Authentication failed. Username is incorrect or does not exist'});
        } else if (user) {
          // check if password matches
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            res.status(404).send({
            'error': true, 'message': 'Authentication failed. Incorrect password' });
          } else {
            // User is found and password is correct
            // create a token for authentication
            const token = jwt.sign({ user: user.id }, 'secretPassword', {
              expiresIn: '6h' // expires in 6 hours
            });
            // return success message including token in JSON format
            res.status(200).send({
              message: 'Authentication & Login successful', authToken: token, userData: user
            });
          }
        }
      })
    .catch(err => res.status(400).send('Login Failed, Please re-confirm details'));
};

let validateUser = (req,res) => {
      //check if username field is empty
      if (!req.body.username || req.body.username.trim() === '' ) {
          return res.status(400).send({'error': false, 'message': 'username field cannot be empty', 'userData': req.body});
      }
     //check if password field is empty
     if (!req.body.password || req.body.password.trim() === '') {
          return res.status(400).send({'error': false, 'message': 'password field cannot be empty', 'userData': req.body});
      }
    //check if firstName field is empty
      if (!req.body.firstName || req.body.firstName.trim() === '') {
          return res.status(400).send({'error': false, 'message': 'firstName field cannot be empty', 'userData': req.body});
      }
    //check if lastName field is empty
      if (!req.body.lastName || req.body.lastName.trim() === '') {
          return res.status(400).send({'error': false, 'message': 'lastName field cannot be empty', 'userData': req.body});
      }
   //check if mobile field is empty
      if (!req.body.mobileNumber || req.body.mobileNumber === '') {
          return res.status(400).send({'error': false, 'message': 'mobile field cannot be empty', 'userData': req.body});
      }
   //check if email field is empty
      if (!req.body.email || req.body.email.trim() === '') {
          return res.status(400).send({'error': false, 'message': 'email field cannot be empty', 'userDate': req.body});
      }

    //check if password field contains more than 3 characters
      if (req.body.password.trim() < 4) {
          return res.status(400).send({'error': false, 'message': 'password must have more than 3 characters', 'userData': req.body});
      }
    //check if firstName field contains more than 3 characters
     if (req.body.firstName.length > 50) {
          return res.status(400).send({'error': false, 'message': 'firstName must have less than 51 characters', 'userData': req.body});
      }
    //check if lastName field contains more than 3 characters
     if (req.body.lastName.length > 50) {
          return res.status(400).send({'error': false, 'message': 'lastName must have less than 51 characters', 'userData': req.body});
      }

};



