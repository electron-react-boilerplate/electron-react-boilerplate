/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    // Load the Next.js dashboard on dedicated port 10000
    const port = process.env.DASHBOARD_PORT || 10000;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = '/';
    return url.href;
  }
  // In production, load the static Next.js export
  return `file://${path.resolve(__dirname, '../renderer/index.html')}`;
}
