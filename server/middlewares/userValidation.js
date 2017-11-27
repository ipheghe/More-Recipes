import db from '../models/index';

const { User } = db;

/**
 * @module validateUserFields
 * @description middleware function to validate user fields
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const validateUserFields = (req, res, next) => {
  // check if username field is empty
  if (!req.body.username || req.body.username.trim() === '') {
    return res.status(400).send({
      message: 'username field cannot be empty',
      userData: req.body
    });
  }
  // check if password field is empty
  if (!req.body.password || req.body.password.trim() === '') {
    return res.status(400).send({
      message: 'password field cannot be empty',
      userData: req.body
    });
  }
  // check if firstName field is empty
  if (!req.body.firstName || req.body.firstName.trim() === '') {
    return res.status(400).send({
      message: 'firstName field cannot be empty',
      userData: req.body
    });
  }
  // check if lastName field is empty
  if (!req.body.lastName || req.body.lastName.trim() === '') {
    return res.status(400).send({
      message: 'lastName field cannot be empty',
      userData: req.body
    });
  }
  // check if mobile field is empty
  if (!req.body.mobileNumber || req.body.mobileNumber === '') {
    return res.status(400).send({
      message: 'mobile field cannot be empty',
      userData: req.body
    });
  }
  // check if email field is empty
  if (!req.body.email || req.body.email.trim() === '') {
    return res.status(400).send({
      message: 'email field cannot be empty',
      userData: req.body
    });
  }
  // check if username field contains more than 3 characters
  if (req.body.username.length < 4) {
    return res.status(400).send({
      message: 'username must have more than 3 characters',
      userData: req.body
    });
  }
  // check if password field contains more than 3 characters
  if (req.body.password.length < 4) {
    return res.status(400).send({
      message: 'password must have more than 3 characters',
      userData: req.body
    });
  }
  // check if firstName field contains more than 3 characters
  if (req.body.firstName.length > 50) {
    return res.status(400).send({
      message: 'firstName must have less than 51 characters',
      userData: req.body
    });
  }
  //  check if lastName field contains more than 3 characters
  if (req.body.lastName.length > 50) {
    return res.status(400).send({
      message: 'lastName must have less than 51 characters',
      userData: req.body
    });
  }
  return next();
};

/**
 * @module validUser
 * @description middleware function to check if user exists
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const validUser = (req, res, next) => {
  User.findById(req.params.userId || req.decoded.user.id)
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message: 'user account not available!',
          userData: req.body
        });
      }
      next();
    });
};

export { validateUserFields, validUser };
