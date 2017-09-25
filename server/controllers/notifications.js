import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import db from '../models/index';

dotenv.load();
const Recipe = db.Recipe;
const User = db.User;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
const reviewNotification = (req, res, next) => {
  Recipe
    .findOne({
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
            text: `${req.decoded.user.username} commented on your recipe post`,
          };
          transporter.sendMail(mailOptions);
      })
      next();
    });
};

export default reviewNotification;