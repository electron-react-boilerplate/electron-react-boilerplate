import fs from 'fs';
import webpackPaths from '../configs/webpack.paths';

const { srcNodeModulesPath, appNodeModulesPath, erbNodeModulesPath } =
  webpackPaths;

if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
}

if (!fs.existsSync(erbNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, erbNodeModulesPath, 'junction');
}
