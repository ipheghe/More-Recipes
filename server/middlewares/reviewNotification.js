import isOnline from 'is-online';
import dotenv from 'dotenv';
import db from '../models/index';
import transporter from '../helpers/mailTransporter';
import emailTemplate from '../helpers/emailTemplate';

dotenv.load();
const { User, Recipe } = db;

/**
 * @module reviewNotification
 * @description controller function sends notification
 * to user after user recipe has a new post review
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const reviewNotification = (req, res, next) => {
  isOnline().then((online) => {
    if (online) {
      Recipe.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          attributes: ['email', 'fullName']
        }
      })
        .then((recipe) => {
          recipe.increment('notification').then((recipes) => {
            const message = `${req.decoded.user.username} commented on your recipe post for ${recipes.name}`;
            const name = recipes.User.fullName;
            const mailOptions = {
              from: '"MoreRecipes Admin" <iphegheapp@gmail.com>',
              to: recipes.User.email,
              subject: 'You have a new notification',
              html: emailTemplate(name, 'View Recipe', message, `${req.headers.host}/#/recipe/${recipes.id}`)
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                next();
              } else {
                res.status(200).send({ message: 'mail sent successfully', info });
              }
            });
          });
        });
    } else {
      return res.status(401);
    }
  })
    .catch(error => res.status(500).send({ error: error.message }));
};

export default reviewNotification;
