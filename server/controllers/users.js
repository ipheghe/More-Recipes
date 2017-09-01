const User = require('../models').User;

//signup controller
module.exports.signup = (req, res) => {

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
    //create user record
   User.create(req.body)
        
    .then(user => res.status(201).send({ message: 'User account successfully created.', userData: user }))
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
  User.findOne({ where: { username: req.body.username, $and: { password: req.body.password } } })
    .then((user) => {

      if (user) {
        // Allow user to login if the credentials are correct
        res.send({ message: 'Login Successful!.', userData: user } );
      } else {
        // Fail if the credentials are wrong
        res.send('username and password mismatch, Please retry with the correct details');
      }
    })
    .catch(err => res.status(400).send('Login Failed, Please re-confirm details'));
};
