/* eslint @typescript-eslint/no-var-requires: off */
const path = require('path');

require('@babel/register')({
  cwd: path.join(__dirname, '..', '..')
});
