/**
 * Builds the DLL for development electron renderer process
 */

import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import { dependencies } from './package.json';

const dist = path.resolve(process.cwd(), 'dll');

export default merge(baseConfig, {
  context: process.cwd(),

  devtool: 'eval',

  target: 'electron-renderer',

  resolve: {
    modules: [
      'app',
      'node_modules',
    ],
  },

  entry: {
    vendor: [
      'babel-polyfill',
      ...Object.keys(dependencies)
    ]
    .filter(dependency => dependency !== 'font-awesome'),
  },

  output: {
    library: 'vendor',
    path: dist,
    filename: '[name].dll.js',
    libraryTarget: 'var'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(dist, '[name].json'),
      name: '[name]',
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: path.resolve(process.cwd(), 'app'),
        output: {
          path: path.resolve(process.cwd(), 'dll'),
        },
      },
    })
  ],
  externals: ['fsevents', 'crypto-browserify']
});
