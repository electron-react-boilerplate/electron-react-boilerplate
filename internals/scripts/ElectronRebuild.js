// @flow
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import getModulesPath from 'node-modules-path';
import { dependencies } from '../../app/package';

const nodeModulesPath = getModulesPath(path.join(__dirname, '..', '..', 'app'));

if (
  Object.keys(dependencies || {}).length > 0 &&
  fs.existsSync(nodeModulesPath)
) {
  const electronRebuildCmd = `${path.join(
    getModulesPath(__dirname),
    './.bin/electron-rebuild'
  )} --parallel --force --types prod,dev,optional --module-dir .`;

  const cmd =
    process.platform === 'win32'
      ? electronRebuildCmd.replace(/\//g, '\\')
      : electronRebuildCmd;

  execSync(cmd, {
    cwd: path.join(__dirname, '..', '..', 'app')
  });
}
