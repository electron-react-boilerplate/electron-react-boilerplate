import path from 'path';
import fs from 'fs';

const json = JSON.parse(fs.readFileSync(path.resolve('.', 'package.json')));
const newJson = {
  productName: `${json.productName}_dev`,
  main: './main.dev.js'
};
fs.writeFileSync(
  path.resolve('.', 'app', 'package.json'),
  JSON.stringify(newJson)
);
