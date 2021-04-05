import path from 'path';
import rimraf from 'rimraf';
import WebpackPaths from '../configs/webpack.paths.js'

export default function deleteSourceMaps() {
  rimraf.sync(path.join(WebpackPaths.distMainPath, '*.js.map'));
  rimraf.sync(path.join(WebpackPaths.distRendererPath, '*.js.map'));
}