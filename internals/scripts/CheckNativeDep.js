// @flow
import fs from 'fs';
import chalk from 'chalk';

const EndOfLine = require('os').EOL;
const { execSync } = require('child_process');

const locateNativeDeps = async () => {
  let nativeDeps = [];
  fs.readdirSync('node_modules')
    .filter(folder => fs.existsSync(`node_modules/${folder}/binding.gyp`))
    .forEach(dep => {
      nativeDeps.push(dep);
    });
  return nativeDeps;
};

locateNativeDeps()
  .then(nativeDeps => {
    if (nativeDeps.length > 0) console.log(`${chalk.whiteBright.bgRed.bold(`Webpack does not work with native dependencies.`)} ${chalk.inverse(nativeDeps)} should be installed inside of the app folder. ${EndOfLine} ${EndOfLine}Read more about native dependencies at https://github.com/chentsulin/electron-react-boilerplate/wiki/Module-Structure----Two-package.json-Structure ${EndOfLine}`);
});
