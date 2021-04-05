const rimraf = require('rimraf');
const WebpackPaths = require('../configs/webpack.paths.js');
const process = require('process');

const args = process.argv.slice(2);
const commandMap = {
  dist: WebpackPaths.releasePath,
  release: WebpackPaths.distPath,
  dll: WebpackPaths.dllPath,
};

(function clean() {
  args.forEach(x => {
    const pathToRemove = commandMap[x];
    if (pathToRemove !== undefined) {
      rimraf.sync(pathToRemove);
    }
  });
  ;
})();
