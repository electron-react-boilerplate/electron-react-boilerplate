import { app } from 'electron';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export function resolveHtmlPath(htmlFileName: string) {
  if (!app.isPackaged && process.env.ELECTRON_RENDERER_URL) {
    return new URL(htmlFileName, `${process.env.ELECTRON_RENDERER_URL}/`).href;
  }
  return pathToFileURL(path.join(__dirname, '../renderer', htmlFileName)).href;
}
