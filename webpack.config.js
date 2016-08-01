var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');

var TARGET = process.env.npm_lifecycle_event;

var BUILD_DIR_PRODUCTION = path.resolve(__dirname, 'dist/public/');
var BUILD_DIR = path.resolve(__dirname, 'public/');
var APP_DIR = path.resolve(__dirname, 'src/');

var commonConfig = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  },
};

var productionConfig = {
  output: {
    path: BUILD_DIR_PRODUCTION,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};

var config = commonConfig;
if (TARGET === 'dist') {
  config = merge.smart(config, productionConfig);
}
module.exports = config;
