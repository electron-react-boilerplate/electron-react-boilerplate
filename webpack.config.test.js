// for babel-plugin-webpack-loaders
require('babel-register');
const devConfigs = require('./webpack.config.development');
const validate = require('webpack-validator');

module.exports = validate({
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: devConfigs.module.loaders.slice(1)  // remove babel-loader
  }
});
