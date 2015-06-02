var packager = require('electron-packager')
var assign = require('object-assign')
var del = require('del')
var latest = require('github-latest-release')
var argv = require('minimist')(process.argv.slice(2))
var devDeps = Object.keys(require('./package.json').devDependencies)



var appName = argv.name || argv.n || 'ElectronReact'
var shouldUseAsar = argv.asar || argv.a || false

var DEFAULT_OPTS = {
  dir: './',
  name: appName,
  asar: shouldUseAsar,
  ignore: [
    '/test($|/)',
    '/tools($|/)',
    '/release($|/)'
  ].concat(devDeps.map(function(name) { return '/node_modules/' + name + '($|/)' }))
}

var icon = argv.icon || argv.i

if (icon) {
  DEFAULT_OPTS.icon = icon
}

var version = argv.version || argv.v

if (version) {
  DEFAULT_OPTS.version = version
  packForPlatforms()
} else {
  latest('atom', 'electron', function(err, res) {
    if (err) {
      DEFAULT_OPTS.version = '0.27.1'
    } else {
      DEFAULT_OPTS.version = res.name.split('v')[1]
    }
    packForPlatforms()
  })
}

var MacOS_OPTS, Linux_OPTS, Windows_OPTS

function assignOpts() {
  MacOS_OPTS = assign({}, DEFAULT_OPTS, {
    platform: 'darwin',
    arch: 'x64',
    out: 'release/darwin',
  })

  Linux_OPTS = assign({}, DEFAULT_OPTS, {
    platform: 'linux',
    arch: 'x64',
    out: 'release/linux',
  })

  Windows_OPTS = assign({}, DEFAULT_OPTS, {
    platform: 'win32',
    arch: 'x64',
    out: 'release/win32',
  })
}


function packForPlatforms() {
  assignOpts()
  del.sync('release')
  pack(MacOS_OPTS, thenPack(Linux_OPTS, thenPack(Windows_OPTS, log)))
}

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
