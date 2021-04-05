// Check if the renderer and main bundles are built
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import WebpackPaths from '../configs/webpack.paths.js';

const mainPath = path.join(WebpackPaths.distMainPath, 'main.prod.js');
const rendererPath = path.join(WebpackPaths.distRendererPath, 'renderer.prod.js');

if (!fs.existsSync(mainPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The main process is not built yet. Build it by running "yarn build:main"'
    )
  );
}

if (!fs.existsSync(rendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The renderer process is not built yet. Build it by running "yarn build:renderer"'
    )
  );
}
