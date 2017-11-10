import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import db from '../models/index';
import isOnline from 'is-online';

dotenv.load();
const Recipe = db.Recipe;
const User = db.User;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * @module reviewNotification
 * @description controller function sends notification to user after user recipe has a new post review
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const reviewNotification = (req, res) => {
  isOnline().then((online) => {
    if (online) {
      Recipe.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          attributes: ['email']
        }
      })
        .then((recipe) => {
          recipe.increment('notification').then((recipes) => {
            const mailOptions = {
              from: '"MoreRecipes Admin" <iphegheovie@gmail.com>',
              to: recipes.User.email,
              subject: 'You have a new notification',
              text: `${req.decoded.user.username} commented on your recipe post for ${recipes.recipeName}`,
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                res.status(400).send({ error: err.message });
              } else {
                res.status(200).send({ message: 'mail sent successfully', info });
              }
            });
          });
        });
    } else {
      console.log('no internet');
      return res.status(400);
    }
  })
  .catch(error => res.status(400).send({ error: error.message }));
};

export default reviewNotification;
