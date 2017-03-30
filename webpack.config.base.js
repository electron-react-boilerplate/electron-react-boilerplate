/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import { dependencies as externals } from './app/package.json';

const babelrc = JSON.parse(
    fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf-8')
  );

/**
 * @HACK: Webpack 2 has native import/export support. Our `.babelrc`
 *        still needs module transpilation for node-register.
 *        Here, we override the 'env' preset in our babelrc by setting
 *        `modules` to `false`
 */
const presets = [['env', {
  targets: { node: 6 },
  useBuiltIns: true,
  modules: false
}]]
.concat((babelrc.presets || []).filter(preset =>
  !Array.isArray(preset) || preset[0] !== 'env'
));

export default {
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          ...babelrc,
          presets,
          babelrc: false,
          cacheDirectory: true
        }
      }
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
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
      path.join(__dirname, 'app'),
      'node_modules',
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
  ],

  externals: Object.keys(externals || {})
};
