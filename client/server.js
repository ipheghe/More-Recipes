import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import bodyParser from 'webpack-body-parser';
import config from '../webpack.config';


const port = 3000;
const app = express();
const compiler = webpack(config);

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());

app.use(require('react-dev-utils/webpackHotDevClient')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('react-dev-utils/webpackHotDevClient')(compiler));

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


// Default catch-all route that sends a message on all PostIt hit.
const indexPath = path.join(__dirname, '/public/index.html');
const publicPath =
express.static(path.join(__dirname, '/public/dist'));

app.use('/dist', publicPath);
app.get('/', (req, res) => { res.sendFile(indexPath); });


app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
    // console.log('App is running');
  }
});
