/* eslint global-require: 0, import/no-dynamic-require: 0 */

/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';

const pkg = require(path.resolve(process.cwd(), './app/package.json'));
const externals = pkg.dependencies;

export default {
  externals: Object.keys(externals || {}),

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]
  },

  output: {
    path: path.join(process.cwd(), 'app'),
    filename: 'bundle.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(process.cwd(), 'app'),
      'node_modules',
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};
