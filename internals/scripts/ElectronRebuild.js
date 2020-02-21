import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import { dependencies } from '../../app/package.json';

const nodeModulesPath = path.join(__dirname, '../../app/node_modules');

if (
  Object.keys(dependencies || {}).length > 0 &&
  fs.existsSync(nodeModulesPath)
) {
  let electronRebuildBinPath;
  try {
    electronRebuildBinPath = execSync('yarn bin electron-rebuild');
  } catch (yarnErr) {
    console.warn('Attempting to get electron-rebuild bin path with NPM');
    try {
      electronRebuildBinPath = execSync('npm bin electron-rebuild');
    } catch (npmErr) {
      throw new Error(
        'Could not get electron-rebuild bin path with either yarn or npm'
      );
    }
  }
  const electronRebuildCmd = execSync(
    `${electronRebuildBinPath} --parallel --force --types prod,dev,optional --module-dir .`
  );
  const cmd =
    process.platform === 'win32'
      ? electronRebuildCmd.replace(/\//g, '\\')
      : electronRebuildCmd;
  execSync(cmd, {
    cwd: path.join(__dirname, '../../app'),
    stdio: 'inherit'
  });
}
