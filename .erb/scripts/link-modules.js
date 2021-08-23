import fs from 'fs';
import {
  appNodeModulesPath,
  srcNodeModulesPath,
} from '../configs/webpack.paths';

if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
}
