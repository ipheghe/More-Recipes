import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import config from './webpack.config';
import {
  userRoute,
  recipeRoute,
  reviewRoute,
  categoryRoute,
  favoriteRoute,
  voteRoute
} from './server/routes';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// set up the express app
const app = express();
const compiler = webpack(config);

// Enable All CORS Requests
app.use(cors());

// log requests to console
app.use(logger('dev'));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Require our routes into the application.
app.use(userRoute);
app.use(recipeRoute);
app.use(reviewRoute);
app.use(categoryRoute);
app.use(favoriteRoute);
app.use(voteRoute);

app.get('/*', (req, res, next) => {
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

// Default catch-all route that sends a message on all more recipes hit.
const indexPath = path.join(__dirname, '/client/public/index.html');
const publicPath =
express.static(path.join(__dirname, '/client/public/dist'));

app.use('/dist', publicPath);
app.get('/', (req, res) => { res.sendFile(indexPath); });


app.get('/api', (req, res) => res.status(200).send({
  status: 'success',
  message: 'Status connected ok',
}));

app.all('*', (req, res) => res.status(404).send({
  message: 'Oops! 404. Page not Found',
}));

const port = parseInt(process.env.PORT, 10) || 8000;
app.listen(port, () => {
});

export default app;

