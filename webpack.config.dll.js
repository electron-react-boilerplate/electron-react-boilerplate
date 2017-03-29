import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import { devDependencies, dependencies } from './package.json';

export default merge(baseConfig, {
  context: path.join(__dirname, 'app', 'dist'),

  devtool: 'eval',

  // entry: ['react'],

  entry: {
    dll: Object.keys({ ...devDependencies, ...dependencies })
      // .filter(external => !external.includes('babel'))
      .filter(external => !external.includes('webpack'))
      .filter(external => !external.includes('eslint'))
      .filter(external => !external.includes('flow'))
      .filter(external => !external.includes('jest'))
      .filter(external => external !== 'electron-builder')
      .filter(external => external !== 'jest-cli')
      .filter(external => external !== 'boiler-room-custodian')
      .filter(external => external !== 'concurrently')
      .filter(external => external !== 'enzyme')
      .filter(external => external !== 'electron-chromedriver')
      .filter(external => external !== 'spectron')
      .filter(external => external !== 'font-awesome')
      .filter(external => external !== 'fbjs-scripts'),
  },


  output: {
    library: 'vendor_lib',
    path: 'dist/',
    filename: 'dll.js',
    libraryTarget: 'var'
  },

  target: 'electron-renderer',

  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: './dist/dll.json'
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
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // turn debug mode on.
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
});
