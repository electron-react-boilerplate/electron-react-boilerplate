// @flow
import { execSync } from 'child_process';

const electronRebuildCmd =
  '../../node_modules/.bin/electron-rebuild --parallel --force --types prod,dev,optional --module-dir ../../app';

if (process.platform === 'win32') {
  execSync(electronRebuildCmd.replace(/\//g, '\\'));
} else {
  execSync(electronRebuildCmd);
}
