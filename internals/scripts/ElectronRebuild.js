// @flow
import path from 'path';
import { execSync } from 'child_process';
import dependencies from '../../app/package.json';

if (dependencies.length > 0) {
  const electronRebuildCmd =
  '../node_modules/.bin/electron-rebuild --parallel --force --types prod,dev,optional --module-dir .';

  const cmd = process.platform === 'win32'
    ? electronRebuildCmd.replace(/\//g, '\\')
    : electronRebuildCmd;

  execSync(cmd, {
    cwd: path.join(__dirname, '..', '..', 'app')
  });
}
