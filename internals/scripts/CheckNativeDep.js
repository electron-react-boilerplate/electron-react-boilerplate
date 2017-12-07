// @flow
import fs from 'fs';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { dependencies } from '../../package.json';

(() => {
  if (!dependencies) return;

  const dependenciesKeys = Object.keys(dependencies);
  const nativeDeps =
    fs.readdirSync('node_modules')
      .filter(folder => fs.existsSync(`node_modules/${folder}/binding.gyp`));

  // Find the reason for why the dependency is installed. If it is installed
  // because of a devDependency then that is okay. Warn when it is installed
  // because of a dependency
  const dependenciesObject = JSON.parse(execSync(`npm ls ${nativeDeps.join(' ')} --json`).toString());
  const rootDependencies = Object.keys(dependenciesObject.dependencies);
  const filteredRootDependencies = rootDependencies
    .filter(rootDependency => dependenciesKeys.includes(rootDependency));

  if (filteredRootDependencies.length > 0) {
    const plural = filteredRootDependencies.length > 1;
    console.log(`${chalk.whiteBright.bgRed.bold('Webpack does not work with native dependencies.')}
${chalk.bold(filteredRootDependencies.join(', '))} ${plural ? 'are native dependencies' : 'is a native dependency'} and should be installed inside of the ./app folder.


${chalk.bold('Instead of this:')}
${chalk.whiteBright.bgRed.bold('npm install your-package --save')}
${chalk.bold('Do this:')}
${chalk.whiteBright.bgGreen.bold('cd ./app && npm install your-package --save')}


Read more about native dependencies at https://github.com/chentsulin/electron-react-boilerplate/wiki/Module-Structure----Two-package.json-Structure`);
  }
})();
