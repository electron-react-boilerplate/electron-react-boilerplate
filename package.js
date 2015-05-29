var packager = require('electron-packager')
var assign = require('object-assign')
var argv = require('minimist')(process.argv.slice(2))
var devDeps = Object.keys(require('./package.json').devDependencies)


var version = argv.version || argv.v || '0.27.1'
var appName = argv.name || argv.n || 'ElectronReact'

var DEFAULT_OPTS = {
  version: version,
  dir: './',
  name: appName,
  ignore: [
    '/test($|/)',
    '/tools($|/)',
    '/release($|/)'
  ].concat(devDeps.map(function(name) { return '/node_modules/' + name + '($|/)' }))
}

var MacOS_OPTS = assign({}, DEFAULT_OPTS, {
  platform: 'darwin',
  arch: 'x64',
  out: 'release/darwin',
})

var Linux_OPTS = assign({}, DEFAULT_OPTS, {
  platform: 'linux',
  arch: 'x64',
  out: 'release/linux',
})

var Windows_OPTS = assign({}, DEFAULT_OPTS, {
  platform: 'win32',
  arch: 'x64',
  out: 'release/win32',
})


pack(MacOS_OPTS, thenPack(Linux_OPTS, thenPack(Windows_OPTS, log)))


function pack(opts, cb) {
  packager(opts, cb)
}

function thenPack(opts, cb) {
  return function() {
    packager(opts, cb)
  }
}

function log(err, filepath) {
  if (err) return console.error(err)
  console.log('finished!')
}
