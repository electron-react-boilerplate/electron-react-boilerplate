// @flow
// Check if the renderer and main bundles are built
import path from 'path';
import fs from 'fs';

import chalk from 'chalk';

function CheckBuildsExist() {
  const mainPath = path.join(__dirname, '..', '..', 'build', 'main.js');
  const rendererPath = path.join(__dirname, '..', '..', 'build', 'bundle.js');

  if (!fs.existsSync(mainPath)) {
    throw new Error(chalk.whiteBright.bgRed.bold(
      'The main process is not built yet. Build it by running "npm run build-main"'
    ));
  }

  if (!fs.existsSync(rendererPath)) {
    throw new Error(chalk.whiteBright.bgRed.bold(
      'The renderer process is not built yet. Build it by running "npm run build-renderer"'
    ));
  }
}

CheckBuildsExist();
