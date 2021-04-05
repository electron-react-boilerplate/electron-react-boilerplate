const path = require('path');
const WebpackPaths = require('../configs/webpack.paths.js');

require('@babel/register')({
  extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
  cwd: WebpackPaths.rootPath,
});
