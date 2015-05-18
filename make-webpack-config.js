var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StatsPlugin = require('stats-webpack-plugin')
var loadersByExtension = require('./lib/loaders-by-extension')



module.exports = function(opts) {

  var entry = [
    'webpack-dev-server/client?http://localhost:2992',
    'webpack/hot/only-dev-server',
    './app/scripts/app.jsx'
  ]



  var loaders = [
    { test: /\.(js|jsx)$/, loaders: [ 'react-hot', 'babel' ], exclude: /node_modules/ },
    { test: /\.styl$/, loaders: [ 'style', 'css', 'stylus' ], exclude: /node_modules/ },
    { test: /\.css$/, loaders: [ 'style', 'css' ], exclude: /node_modules/ },
    { test: /\.json$/, loader: 'json', exclude: /node_modules/ },
    { test: /\.(png|jpg)$/, loaders: [ 'url?limit=8192' ], exclude: /node_modules/ }
  ]

  var cssLoader = opts.minimize ? 'css-loader' : 'css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]';

  var stylesheetLoaders = {
    'css': cssLoader,
    'less': [ cssLoader, 'less-loader' ],
    'styl': [ cssLoader, 'stylus-loader' ],
    'scss|sass': [ cssLoader, 'sass-loader' ]
  }

  var additionalLoaders = [
    // { test: /some-reg-exp$/, loader: 'any-loader' }
  ]

  var alias = {

  }

  var aliasLoader = {

  }

  var externals = [

  ]

  var modulesDirectories = [ 'node_modules' ]

  var extensions = ['', '.web.js', '.js', '.jsx'];

  var root = path.join(__dirname, 'app')

  var publicPath = opts.devServer
                 ? 'http://localhost:2992/_assets/'
                 : '/_assets/'


  var output = {
    path: __dirname + '/public/js/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:2992/',
    contentBase: __dirname + '/public/'
  }

  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/
  ]


  var plugins = [
    new webpack.HotModuleReplacementPlugin()
  ]

  if (opts.prerender) {
    plugins.push(new StatsPlugin(path.join(__dirname, 'build', 'stats.prerender.json'), {
      chunkModules: true,
      exclude: excludeFromStats
    }));
    aliasLoader['react-proxy$'] = 'react-proxy/unavailable';
    aliasLoader['react-proxy-loader$'] = 'react-proxy-loader/unavailable';
    externals.push(
      /^react(\/.*)?$/,
      /^reflux(\/.*)?$/,
      'superagent',
      'async'
    );
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  } else {
    plugins.push(new StatsPlugin(path.join(__dirname, 'build', 'stats.json'), {
      chunkModules: true,
      exclude: excludeFromStats
    }));
  }

  if (opts.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js' + (opts.longTermCaching && !opts.prerender ? '?[chunkhash]' : '')))
  }

  // var asyncLoader = {
  //   test: require('./app/route-handlers/async').map(function(name) {
  //     return path.join(__dirname, 'app', 'route-handlers', name);
  //   }),
  //   loader: opts.prerender ? 'react-proxy-loader/unavailable' : 'react-proxy-loader'
  // };

  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var stylesheetLoader = stylesheetLoaders[ext];
    if(Array.isArray(stylesheetLoader)) stylesheetLoader = stylesheetLoader.join('!');
    if (opts.prerender) {
      stylesheetLoaders[ext] = stylesheetLoader.replace(/^css-loader/, 'css-loader/locals');
    } else if (opts.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract('style-loader', stylesheetLoader);
    } else {
      stylesheetLoaders[ext] = 'style-loader!' + stylesheetLoader;
    }
  })

  if (opts.separateStylesheet && !opts.prerender) {
    plugins.push(new ExtractTextPlugin('[name].css' + (opts.longTermCaching ? '?[contenthash]' : '')));
  }

  if(opts.minimize && !opts.prerender) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin()
    )
  }

  if (opts.minimize) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.NoErrorsPlugin()
    )
  }

  return {
    entry: entry,
    output: output,
    target: opts.prerender ? 'node' : 'web',
    module: {
      loaders: [].concat(loadersByExtension(loaders)).concat(loadersByExtension(stylesheetLoaders)).concat(additionalLoaders)
    },
    devtool: opts.devtool,
    debug: opts.debug,
    resolve: {
      root: root,
      modulesDirectories: modulesDirectories,
      extensions: extensions,
      alias: alias
    },
    plugins: plugins,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats
      }
    }
  }
}
