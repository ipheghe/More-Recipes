import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, Category } from '../models';
import mailTransporter from '../helpers/mailTransporter';
import emailTemplate from '../helpers/emailTemplate';

dotenv.load();
const salt = bcrypt.genSaltSync(10);
const crypto = require('crypto');

const keys = [
  'id', 'username', 'fullName',
  'mobileNumber', 'email'
];

// user signup & signin controller
export default {

  /**
   * @module signup
   * @description controller function that handles creation of new user account
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message
   */
  signup(req, res) {
    const {
      username,
      fullName,
      mobileNumber,
      email,
      password
    } = req.body;

    User.findOne({
      where: { $or: [{ username }, { email }] }
    }).then((existingUser) => {
      if (existingUser && existingUser.username === username) {
        return res.status(409).json({
          message: 'Username you entered already exist',
        });
      }
      if (existingUser && existingUser.email === email) {
        return res.status(409).json({
          message: 'Email address you entered already exist',
        });
      }
      User.create({
        username,
        password: bcrypt.hashSync(password, salt, null),
        fullName,
        mobileNumber,
        email
      })
        .then((user) => {
          const userData = {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            email: user.email
          };
          return res.status(201).send({
            message: 'User account successfully created.',
            userData
          });
        })
        .catch(error => res.status(400).send({
          error: error.message
        }));
    })
      .catch(err => res.status(500).send({
        error: err
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
          res.status(401).send({
            message: 'Authentication failed. ' +
            'Username is incorrect or does not exist'
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
      .catch(err => res.status(500).send({
        error: err
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
      .catch(err => res.status(500).send({
        error: err
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
    const {
      username,
      fullName,
      mobileNumber,
      email,
    } = req.body;

    User.findOne({
      where: {
        id: req.decoded.user.id
      },
      attributes: keys,
    })
      .then((user) => {
        // if user exists
        User.findOne({
          where: { $or: [{ username }, { email }] }
        }).then((existingUser) => {
          if (
            existingUser
            && existingUser.username === username
            && existingUser.username !== user.username
          ) {
            return res.status(409).json({
              message: 'Username you entered already exist',
            });
          }
          if (
            existingUser
            && existingUser.email === email
            && existingUser.email !== user.email
          ) {
            return res.status(409).json({
              message: 'Email address you entered already exist',
            });
          }
          user.update({
            username: username || user.username,
            fullName: fullName || user.fullName,
            mobileNumber: mobileNumber || user.mobileNumber,
            email: email || user.email
          })
            .then(updatedUser => res.status(200).send({
              message: 'User Record Updated SuccessFullly!',
              userData: updatedUser
            }))
            .catch(error => res.status(400).send({
              error: error.message
            }));
        });
      })
      .catch(err => res.status(500).send({
        error: err
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
              }));
          }
        }
      })
      .catch(err => res.status(500).send({
        status: 'Fail',
        error: err
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
                error: err.message
              });
            }
          })
            .then(() => {
              const message = 'You are receiving this ' +
              'because you (or someone else) have ' +
              'requested the reset of the password for your account.\n\n' +
              'Please click on the button below to complete the process.\n\n' +
              'If you did not request this, please ignore this email and ' +
              'your password will remain unchanged.';
              const name = existingUser.fullName;

              const mailOptions = {
                from: '"MoreRecipes Admin" <iphegheapp@gmail.com>',
                to: existingUser.email,
                subject: 'You have a new notification',
                html: emailTemplate(
                  name,
                  'Reset Password',
                  message,
                  `https://${req.headers.host}/#/reset-password/${resetToken}`
                )
              };
              // Otherwise, send user email via nodemailer
              mailTransporter.sendMail(mailOptions)
                .then(() => res.status(200).json({
                  status: 'Success',
                  message: 'Please check your email for ' +
                    'the link to reset your password.'
                }))
                .catch(err => res.status(500).json({
                  status: 'Fail',
                  error: err
                }));
            });
        });
      })
      .catch(err => res.status(500).json({
        error: err
      }));
  },

  /**
   * @module verifyTokenPassword
   * @description controller function that verifies token
   * after reset of user password
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
          return res.status(422).json({
            error: 'Your token has expired. ' +
            'Please attempt to reset your password again.'
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
            const message = 'You are receiving this email because ' +
                'you changed your password. \n\n' +
                'If you did not request this change, ' +
                'please contact us immediately.';
            const name = existingUser.fullName;
            const mailOptions = {
              from: '"MoreRecipes Admin" <iphegheapp@gmail.com>',
              to: existingUser.email,
              subject: 'Password Changed',
              html: emailTemplate(
                name,
                'Go to App',
                message,
                `https://${req.headers.host}/#/login`
              )
            };
            // Otherwise, send user email via nodemailer
            mailTransporter.sendMail(mailOptions)
              .then(() => res.status(200).json({
                status: 'Success',
                message: 'Please check your email for ' +
                    'the link to reset your password.'
              }))
              .catch(err => res.status(500).json({
                status: 'Fail',
                error: err
              }));
          });
      })
      .catch(err => res.status(500).send({
        error: err
      }));
  }
};
