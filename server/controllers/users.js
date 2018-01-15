import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import isOnline from 'is-online';
import dotenv from 'dotenv';
import db from '../models/index';
import transporter from '../helpers/mailTransporter';
import emailTemplate from '../helpers/emailTemplate/emailTemplate';

dotenv.load();
const { User, Category } = db;
const salt = bcrypt.genSaltSync(10);
const crypto = require('crypto');

const keys = [
  'id', 'username', 'password', 'fullName',
  'mobileNumber', 'email'
];

// user signup & signin controller
const usersController = {

  /**
   * @module signup
   * @description controller function that handles creation of new user account
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message
   */
  signup(req, res) {
    User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt, null), // hash password
      fullName: req.body.fullName,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email
    })
      .then((user) => {
        const userData = {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
        return res.status(201).send({
          message: 'User account successfully created.',
          userData
        });
      })
      .catch(error => res.status(401).send({
        error: error.message
      }));
  },

  /**
   * @module signin
   * @description controller function that handles login of user
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message authToken
   */
  signin(req, res) {
    // check if the username exists
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            message: 'Authentication failed. Username is incorrect or does not exist'
          }); // username doesnt exist
        } else if (user) {
          // check if password matches
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            res.status(401).send({
              message: 'Authentication failed!'
            });
          } else {
            const userData = {
              id: user.id,
              username: user.username
            };
            // User is found and password is correct
            // create a token for authentication
            const token = jwt.sign({
              user: userData
            }, process.env.TOKEN_SECRET, {
              expiresIn: process.env.TOKEN_EXPIRY_TIME // expires in 6 hours
            });
            // return success message including token in JSON format
            res.status(200).send({
              message: 'Authentication & Login successful',
              authToken: token
            });
          }
        }
      })
      .catch(() => res.status(500).send({
        message: 'Login Failed, Please re-confirm details'
      }));
  },

  /**
   * @module getUserDetails
   * @description controller function that gets user details
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message userData
   */
  getUserDetails(req, res) {
    return User
      .findOne({
        where: {
          username: req.params.username
        },
        attributes: keys,
        include: [{
          model: Category,
          as: 'categories',
          attributes: ['id', 'name']
        }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User doesnt exist'
          });
        }
        return res.status(200).send({
          message: 'User Record retrieved successfully',
          userData: user
        });
      })
      .catch(error => res.status(500).send({
        error: error.message
      }));
  },

  /**
   * @module updateUserRecord
   * @description controller function that updates user record
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message userData
   */
  updateUserRecord(req, res) {
    return User
      .findOne({
        where: {
          id: req.decoded.user.id
        }
      })
      .then((user) => {
        // if user exists
        user.update({
          username: req.body.username || user.username,
          fullName: req.body.fullName || user.fullName,
          mobileNumber: req.body.mobileNumber || user.mobileNumber,
          email: req.body.email || user.email
        })
          .then(updatedUser => res.status(200).send({
            message: 'User Record Updated SuccessFullly!',
            userData: updatedUser
          }))
          .catch(error => res.status(401).send({
            error: error.message
          }));
      })
      .catch(err => res.status(500).send({
        error: err.message
      }));
  },

  /**
   * @module changePassword
   * @description controller function that changes user password
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message
   */
  changePassword(req, res) {
    return User
      .findOne({
        where: {
          id: req.decoded.user.id
        }
      })
      .then((user) => {
        if (user) {
          // check if password matches
          if (!(bcrypt.compareSync(req.body.password, user.password))) {
            res.status(401).send({
              status: 'Fail',
              message: 'Incorrect password'
            });
          } else {
            // if password matches, update new password
            user.update({
              password: bcrypt.hashSync(req.body.newPassword, salt, null),
            })
              .then(() => res.status(200).send({
                status: 'Success',
                message: 'User Password Changed SuccessFullly!'
              }))
              .catch(error => res.status(401).send({
                status: 'Fail',
                error: error.message
              }));
          }
        }
      })
      .catch(err => res.status(500).send({
        status: 'Fail',
        error: err.message
      }));
  },

  /**
   * @module forgotPassword
   * @description controller function that resets user password
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Object} next - Express next middleware function
   * @return {object} message
   */
  forgotPassword(req, res, next) {
    return User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((existingUser) => {
        if (!existingUser) {
          // If user is not found, return error
          return res.status(404).send({
            status: 'Fail',
            message: 'user email does not exist!'
          });
        }
        // Generate a token with Crypto
        crypto.randomBytes(48, (err, buffer) => {
          const resetToken = buffer.toString('hex');
          if (err) {
            return next(err);
          }

          existingUser.resetPasswordToken = resetToken;
          existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          // If user is found, generate and save resetToken
          existingUser.save((err) => {
            // If error in saving token, return it
            if (err) {
              return res.status(400).json({
                err
              });
            }
          })
            .then(() => {
              const message = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the button below to complete the process.\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.';
              const name = existingUser.fullName;

              const mailOptions = {
                from: '"MoreRecipes Admin" <iphegheapp@gmail.com>',
                to: existingUser.email,
                subject: 'You have a new notification',
                html: emailTemplate(name, 'Reset Password', message, `https://${req.headers.host}/#/reset-password/${resetToken}`)
              };
              // Otherwise, send user email via nodemailer
              // transporter.sendMail(mailOptions);
              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  res.status(422).json({
                    error: err.message
                  });
                } else {
                  return res.status(200).json({
                    status: 'Success',
                    message: 'Please check your email for the link to reset your password.',
                    info
                  });
                }
              });
            });
        });
      })
      .catch(err => res.status(500).json({
        error: err.message
      }));
  },

  /**
   * @module verifyTokenPassword
   * @description controller function that verifies token after reset of user password
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Object} next - Express next middleware function
   * @return {object} message
   */

  verifyTokenPassword(req, res, next) {
    User.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      }
    })
      .then((existingUser) => {
        if (!existingUser) {
          res.status(422).json({
            error: 'Your token has expired. Please attempt to reset your password again.'
          });
        }

        // Otherwise, save new password and clear resetToken from database
        existingUser.password = bcrypt.hashSync(req.body.password, salt, null);
        existingUser.resetPasswordToken = undefined;
        existingUser.resetPasswordExpires = undefined;

        existingUser.save((err) => {
          if (err) {
            return next(err);
          }
        })
          .then(() => {
            isOnline().then((online) => {
              if (online) {
                const message = 'You are receiving this email because you changed your password. \n\n' +
                'If you did not request this change, please contact us immediately.';
                const name = existingUser.fullName;
                const mailOptions = {
                  from: '"MoreRecipes Admin" <iphegheapp@gmail.com>',
                  to: existingUser.email,
                  subject: 'Password Changed',
                  html: emailTemplate(name, 'Go to App', message, `https://${req.headers.host}/#/login`)
                };
                // Otherwise, send user email via nodemailer
                // transporter.sendMail(mailOptions);
                transporter.sendMail(mailOptions, (err) => {
                  if (err) {
                    res.status(422).send({
                      error: err.message
                    });
                  } else {
                    return res.status(200).json({
                      message: 'Password changed successfully. Please login with your new password.'
                    });
                  }
                });
              } else {
                return res.status(400).send({
                  message: 'no internet connectivity'
                });
              }
            })
              .catch(error => res.status(401).send({
                error: error.message
              }));
          })
          .catch(error => res.status(500).send({
            error: error.message
          }));
      });
  }
};
export default usersController;
