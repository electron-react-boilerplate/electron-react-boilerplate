/** Used in .babelrc for 'test' environment */

// for babel-plugin-webpack-loaders
require('babel-register');
const devConfig = require('./webpack.config.development');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    // Use base + development loaders, but exclude 'babel-loader'
    loaders: devConfig.module.rules.slice(1)
  }
};
