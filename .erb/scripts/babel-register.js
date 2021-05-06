const path = require('path');
const webpackPaths = require('../configs/webpack.paths.js');

require('@babel/register')({
  extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
  cwd: webpackPaths.rootPath,
});
