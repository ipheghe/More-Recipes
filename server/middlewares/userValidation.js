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
  // check if fullName field is empty
  if (!req.body.fullName || req.body.fullName.trim() === '') {
    return res.status(400).send({
      message: 'fullName field cannot be empty',
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
  if (req.body.fullName.length > 50) {
    return res.status(400).send({
      message: 'fullName must have less than 51 characters',
      userData: req.body
    });
  }
  return next();
};

/**
 * @module validateUserSigninFeild
 * @description middleware function to validate password field
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const validateUserSigninFeild = (req, res, next) => {
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
  return next();
};

/**
 * @module validatePasswordField
 * @description middleware function to validate password field
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const validatePasswordField = (req, res, next) => {
  // check if password field is empty
  if (!req.body.password || req.body.password.trim() === '') {
    return res.status(400).send({
      message: 'password field cannot be empty',
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
  if (Number.isNaN(parseInt(req.params.userId || req.decoded.user.id, 10))) {
    return res.status(400).send({
      message: 'Id is Invalid!'
    });
  }
  User.findById(req.params.userId || req.decoded.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'user account not available!'
        });
      }
      next();
    });
};

export {
  validateUserFields,
  validateUserSigninFeild,
  validatePasswordField,
  validUser
};
