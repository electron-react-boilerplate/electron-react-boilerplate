// @flow
import fs from 'fs';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { dependencies } from '../../package.json';

const dependenciesKeys = Object.keys(dependencies);

const nativeDeps =
  fs.readdirSync('node_modules')
    .filter(folder => fs.existsSync(`node_modules/${folder}/binding.gyp`));

// Find the reason for why the dependency is installed. If it is installed
// because of a devDependency then that is okay. Warn when it is installed
// because of a dependency
if (nativeDeps.length > 0) {
  // Find the dependency in the package.json that depends on or is a native dependency
  nativeDeps.forEach(nativeDep => {
    const dependenciesObject = JSON.parse(execSync(`npm ls ${nativeDep} --json`).toString());
    const rootDependencies = Object.keys(dependenciesObject.dependencies);
    const filteredRootDependencies = rootDependencies
      .filter(rootDependency => dependenciesKeys.includes(rootDependency))
      .map(rootDependency => {
        console.error(`${rootDependency} is native dep in dependencies`);
        return rootDependency;
      });

    if (filteredRootDependencies.length > 0) {
      console.log(`
      ${chalk.whiteBright.bgRed.bold('Webpack does not work with native dependencies.')}
      ${chalk.inverse(nativeDeps.join(', '))} should be installed inside of the app folder.
      Read more about native dependencies at https://github.com/chentsulin/electron-react-boilerplate/wiki/Module-Structure----Two-package.json-Structure
    `);
    }
  });
}
