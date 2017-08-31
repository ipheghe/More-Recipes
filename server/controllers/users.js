const User = require('../models').User;

//signup controller
module.exports.signup = (req, res) => {
  // find username
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      // Check if the username exists already
      if (!user) {
        // Create user it does not exist
        User.create(req.body)
        
          .then((users) => {

            res.status(200).send(users);
          });
      } else {
        res.send('Username exits already, please choose another username');
      }
    })

    .catch(err => res.status(400).send('Registration Failed, Please reconfirm details'));
};

//signin Controller
module.exports.signin = (req, res) => {
  // Find the user
  User.findOne({ where: { username: req.body.username, $and: { password: req.body.password } } })
    .then((user) => {

      if (user) {
        // Allow user to login if the credentials are correct
        res.send('Login Successful!');
      } else {
        // Fail if the credentials are wrong
        res.send('Your password/password is incorrect, Please retry with the correct details');
      }
    })
    .catch(err => res.status(400).send('Login Failed, Please reconfirm details'));
};
