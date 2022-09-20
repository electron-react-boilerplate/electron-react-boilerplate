import rimraf from 'rimraf';
import webpackPaths from '../configs/webpack.paths.mjs';

const foldersToRemove = [
  webpackPaths.distPath,
  webpackPaths.buildPath,
  webpackPaths.dllPath,
];

foldersToRemove.forEach((folder) => {
  rimraf.sync(folder);
});
