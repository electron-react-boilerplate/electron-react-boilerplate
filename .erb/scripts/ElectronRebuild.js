import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import { dependencies } from '../../build/app/package.json';
import WebpackPaths from '../configs/webpack.paths.js';

if (
  Object.keys(dependencies || {}).length > 0 &&
  fs.existsSync(WebpackPaths.nodeModulesPath)
) {
  const electronRebuildCmd =
    '../node_modules/.bin/electron-rebuild --parallel --force --types prod,dev,optional --module-dir .';
  const cmd =
    process.platform === 'win32'
      ? electronRebuildCmd.replace(/\//g, '\\')
      : electronRebuildCmd;
  execSync(cmd, {
    cwd: WebpackPaths.appPath,
    stdio: 'inherit',
  });
}
