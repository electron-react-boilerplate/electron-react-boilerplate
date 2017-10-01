// @flow
import fs from 'fs';
import chalk from 'chalk';

const locateNativeDeps = async () => fs.readdirSync('node_modules')
  .filter(folder => fs.existsSync(`node_modules/${folder}/binding.gyp`) && folder !== 'node-sass');

locateNativeDeps()
  .then(nativeDeps => {
    if (nativeDeps.length > 0) {
      return console.log(`${chalk.whiteBright.bgRed.bold('Webpack does not work with native dependencies.')} ${chalk.inverse(nativeDeps)} should be installed inside of the app folder. \r\n \r\nRead more about native dependencies at https://github.com/chentsulin/electron-react-boilerplate/wiki/Module-Structure----Two-package.json-Structure`);
    }
    return null;
  })
  .catch(err => {
    console.log(err);
  });
