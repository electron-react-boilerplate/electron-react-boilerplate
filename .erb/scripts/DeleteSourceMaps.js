import path from 'path';
import rimraf from 'rimraf';

export default function deleteSourceMaps() {
  rimraf.sync(path.join(__dirname, '../../src/dist/*.js.map'));
  rimraf.sync(path.join(__dirname, '../../src/*.js.map'));
}
