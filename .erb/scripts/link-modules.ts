import fs from 'fs';
import paths from '../configs/paths';

const { srcNodeModulesPath, appNodeModulesPath, erbNodeModulesPath } = paths;

if (fs.existsSync(appNodeModulesPath)) {
  if (!fs.existsSync(srcNodeModulesPath)) {
    fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
  }
  if (!fs.existsSync(erbNodeModulesPath)) {
    fs.symlinkSync(appNodeModulesPath, erbNodeModulesPath, 'junction');
  }
}
