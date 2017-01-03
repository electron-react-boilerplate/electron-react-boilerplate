import {readFileSync} from 'fs';

export default function loadFile(absPathOfFile) {
  let data = readFileSync(absPathOfFile, 'utf8');
  console.log(data);
  return data;
}