/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from './app/package.json';

export const rendererModule = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: [
            // Here, we include babel plugins that are only required for the
            // renderer process. The 'transform-*' plugins must be included
            // before react-hot-loader/babel
            'transform-class-properties',
            'transform-es2015-classes',
            'react-hot-loader/babel'
          ],
        }
      }
    },
    {
      test: /\.global\.css$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }
      ]
    },
    {
      test: /^((?!\.global).)*\.css$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          }
        },
      ]
    },
    // SASS support - compile all .global.scss files and pipe it to style.css
    {
      test: /\.global\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader'
        }
      ]
    },
    // SASS support - compile all other .scss files and pipe it to style.css
    {
      test: /^((?!\.global).)*\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    },
    // WOFF Font
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        }
      },
    },
    // WOFF2 Font
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        }
      }
    },
    // TTF Font
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream'
        }
      }
    },
    // EOT Font
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: 'file-loader',
    },
    // SVG Font
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
        }
      }
    },
    // Common Image Formats
    {
      test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
      use: 'url-loader',
    }
  ]
};

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
    path: path.join(__dirname, 'app'),
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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin(),
  ],
};
