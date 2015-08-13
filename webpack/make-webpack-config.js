var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StatsPlugin = require('stats-webpack-plugin')
var loadersByExtension = require('./loaders-by-extension')

var projectRoot = path.join(__dirname, '..')
var appRoot = path.join(projectRoot, 'app')

module.exports = function(opts) {

  var entry = {
    main: opts.prerender ? path.join(appRoot, 'mainApp') : path.join(appRoot, 'mainApp')
  }


  var loaders = {
    'jsx': opts.hotComponents ? [ 'react-hot-loader', 'babel-loader' ] : 'babel-loader',
    'js': {
      loader: 'babel-loader',
      include: appRoot
    },
    'json': 'json-loader',
    'txt': 'raw-loader',
    'png|jpg|jpeg|gif|svg': 'url-loader?limit=10000',
    'woff|woff2': 'url-loader?limit=100000',
    'ttf|eot': 'file-loader',
    'wav|mp3': 'file-loader',
    'html': 'html-loader',
    'md|markdown': [ 'html-loader', 'markdown-loader' ]
  }

  var cssLoader = opts.minimize ? 'css-loader' : 'css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]'

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

  var extensions = [ '', '.js', '.jsx', '.json', '.node' ]

  var publicPath = opts.devServer
                 ? 'http://localhost:2992/dist/'
                 : '/dist/'


  var output = {
    path: projectRoot + '/dist/',
    filename: 'bundle.js',
    publicPath: publicPath,
    contentBase: projectRoot + '/public/',
    libraryTarget: 'commonjs2'
  }

  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/
  ]


  var plugins = [
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
  ]

  if (opts.prerender) {
    plugins.push(new StatsPlugin(path.join(projectRoot, 'dist', 'stats.prerender.json'), {
      chunkModules: true,
      exclude: excludeFromStats
    }))
    aliasLoader['react-proxy$'] = 'react-proxy/unavailable'
    aliasLoader['react-proxy-loader$'] = 'react-proxy-loader/unavailable'
    externals.push(
      /^react(\/.*)?$/,
      /^reflux(\/.*)?$/,
      'superagent',
      'async'
    )
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }))
  } else {
    plugins.push(new StatsPlugin(path.join(projectRoot, 'dist', 'stats.json'), {
      chunkModules: true,
      exclude: excludeFromStats
    }));
  }

  if (opts.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js' + (opts.longTermCaching && !opts.prerender ? '?[chunkhash]' : '')))
  }

  var asyncLoader = {
    test: require('../app/routes/async').map(function(name) {
      return path.join(appRoot, 'routes', name)
    }),
    loader: opts.prerender ? 'react-proxy-loader/unavailable' : 'react-proxy-loader'
  }

  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var stylesheetLoader = stylesheetLoaders[ext]
    if (Array.isArray(stylesheetLoader)) stylesheetLoader = stylesheetLoader.join('!')
    if (opts.prerender) {
      stylesheetLoaders[ext] = stylesheetLoader.replace(/^css-loader/, 'css-loader/locals')
    } else if (opts.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract('style-loader', stylesheetLoader)
    } else {
      stylesheetLoaders[ext] = 'style-loader!' + stylesheetLoader
    }
  })

  if (opts.separateStylesheet && !opts.prerender) {
    plugins.push(new ExtractTextPlugin('[name].css' + (opts.longTermCaching ? '?[contenthash]' : '')))
  }

  if (opts.minimize && !opts.prerender) {
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
          NODE_ENV: "'production'"
        }
      }),
      new webpack.NoErrorsPlugin()
    )
  }

  var nodeModules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' })

  return {
    entry: entry,
    output: output,
    target: 'atom',
    externals: nodeModules,
    module: {
      loaders: [asyncLoader].concat(loadersByExtension(loaders)).concat(loadersByExtension(stylesheetLoaders)).concat(additionalLoaders)
    },
    devtool: opts.devtool,
    debug: opts.debug,
    resolve: {
      root: appRoot,
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
