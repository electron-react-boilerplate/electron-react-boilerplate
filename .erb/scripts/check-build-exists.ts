// Check if the renderer and main bundles are built
import path from 'path';
import fs from 'fs';
import { TextEncoder, TextDecoder } from 'node:util';
import paths from '../configs/paths';

const mainPath = path.join(paths.distMainPath, 'main.js');
const rendererPath = path.join(paths.distRendererPath, 'renderer.js');

if (!fs.existsSync(mainPath)) {
  throw new Error(
    'The main process is not built yet. Build it by running "npm run build"',
  );
}

if (!fs.existsSync(rendererPath)) {
  throw new Error(
    'The renderer process is not built yet. Build it by running "npm run build"',
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
