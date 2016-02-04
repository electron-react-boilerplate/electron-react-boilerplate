// for babel-plugin-webpack-loaders
const devConfigs = require('./webpack.config.development');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: devConfigs.module.loaders.slice(1)  // remove babel-loader
  }
};
