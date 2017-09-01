const User = require('../models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);

//signup controller
module.exports.signup = (req, res) => {
  //validate user fields
  validateUser(req,res);
    //create user record
   User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt, null),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        email: req.body.email
   })
        
    .then((user) => {
       // create a token for authentication
       const signupToken = jwt.sign({ user: user.id }, 'secretPassword',
         { expiresIn: '24hrs'}); // expires in 24hrs
      res.status(201).send({ message: 'User account successfully created.', authToken: signupToken, userData: user })})
    .catch(error => res.send({error: error.message}));


};

//signin Controller
module.exports.signin = (req, res) => {

    //check if username field is empty
    if (!req.body.username) {
      return res.status(400)
      .send({
        error: { message: 'username field cannot be empty' },
        userData: req.body
      });
    }
    //check if password field is empty
    if (!req.body.password) {
      return res.status(400)
      .send({
        error: { message: 'password field cannot be empty' },
        userData: req.body
      });
    }

  // Find the user
  User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            error: { message: 'Authentication failed. Username is incorrect or does not exist'}});
        } else if (user) {
          // check if password matches
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            res.status(404).send({
            error: { message: 'Authentication failed. Incorrect password' }});
          } else {
            // User is found and password is correct
            // create a token for authentication
            const token = jwt.sign({ user: user.id }, 'secretPassword', {
              expiresIn: '6hrs' // expires in 6 hours
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
    if (!req.body.username) {
      return res.status(400)
      .send({
        error: { message: 'username field cannot be empty' },
        userData: req.body
      });
    }
    //check if password field is empty
    if (!req.body.password) {
      return res.status(400)
      .send({
        error: { message: 'password field cannot be empty' },
        userData: req.body
      });
    }
    //check if firstName field is empty
   if (!req.body.firstName) {
      return res.status(400)
      .send({
        error: { message: 'first name field cannot be empty' },
        userData: req.body
      });
    }
    //check if lastName field is empty
    if (!req.body.lastName) {
      return res.status(400)
      .send({
        error: { message: 'last name field cannot be empty' },
        userData: req.body
      });
    }
   //check if mobile field is empty
    if (!req.body.mobile) {
      return res.status(400)
      .send({
        error: { message: 'mobile number field cannot be empty' },
        userData: req.body
      });
    }
   //check if email field is empty
    if (!req.body.email) {
      return res.status(400)
      .send({
        error: { message: 'email field cannot be empty' },
        userData: req.body
      });
    }

    //check if email field is empty
    if (!req.body.email) {
      return res.status(400)
      .send({
        error: { message: 'email field cannot be empty' },
        userData: req.body
      });
    }

};
