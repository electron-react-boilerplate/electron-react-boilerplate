import {readFileSync} from 'fs';

export default function loadFile(absPathOfFile) {
  let data = readFileSync(absPathOfFile, 'utf8');
  return data;
}