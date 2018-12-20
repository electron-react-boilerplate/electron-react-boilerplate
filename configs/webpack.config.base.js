/**
 * Base webpack config used across other specific configs
 */
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import CheckForMonoRepoPackage from '../internals/scripts/CheckForMonoRepoPackage';

export default {
  externals: fs.readdirSync(path.join(__dirname, '../..')).map(directory =>
    nodeExternals({
      modulesFromFile: {
        fileName: path.join('..', directory, 'package.json'),
        include: ['dependencies']
      },
      whitelist: CheckForMonoRepoPackage
    })
  ),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin()
  ]
};
