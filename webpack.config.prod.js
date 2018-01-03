import webpack from 'webpack';
import path from 'path';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';

dotenv.config();

module.exports = {
  entry: [
    path.resolve(__dirname, './client/src/app/index.js')
  ],
  target: 'web', // bundle the code so that a web browser can understand
  output: {
    path: `${__dirname}/client/public/dist`,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      // Compression specific options
      compress: {
        // remove warnings
        warnings: false,
        // Drop console statements
        drop_console: true
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'client/public/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/] },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|jpg|gif|svg)$/i, loader: 'file-loader' },
    ],
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
  },
};
