var packager = require('electron-packager')
var assign = require('object-assign')

var DEFAULT_OPTS = {
  version: '0.26.1',
  dir: './',
  name: 'ElectronReact'
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
