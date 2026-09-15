// Check if the renderer and main bundles are built
import path from 'path';
import fs from 'fs';
import { TextEncoder, TextDecoder } from 'node:util';
import webpackPaths from '../configs/webpack.paths';

const mainPath = path.join(webpackPaths.distMainPath, 'main.js');
const rendererPath = path.join(webpackPaths.distRendererPath, 'renderer.js');

if (!fs.existsSync(mainPath)) {
  throw new Error(
    'The main process is not built yet. Build it by running "npm run build:main"',
  );
}

if (!fs.existsSync(rendererPath)) {
  throw new Error(
    'The renderer process is not built yet. Build it by running "npm run build:renderer"',
  );
}

// JSDOM does not implement TextEncoder and TextDecoder
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}
