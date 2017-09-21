import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './server/routes/index';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const userRoute = router.user,
      recipeRoute = router.recipe,
      reviewRoute = router.review,
      categoryRoute = router.category,
      favoriteRoute = router.favorite,
      voteRoute = router.vote;

//set up the express app
const app = express();

//log requests to console
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  
app.use(express.static('template'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Require our routes into the application.
app.use(userRoute);
app.use(recipeRoute);
app.use(reviewRoute);
app.use(categoryRoute);
app.use(favoriteRoute);
app.use(voteRoute);

// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to  More Recipes.',
// }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api', (req, res) => res.status(200).send({
    status: 'success',
    message: 'Status connected ok',
}));

app.all('*', (req, res) => res.status(404).send({
  message: 'Oops! 404. Page not Found',
}));

export default app;

