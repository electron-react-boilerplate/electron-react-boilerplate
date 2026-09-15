import { ipcMain } from 'electron';
import { IPC_PING } from '../shared/electron-api';

export function isAppUrl(candidate: string, expected: string): boolean {
  try {
    const url = new URL(candidate);
    const appUrl = new URL(expected);
    return (
      url.origin === appUrl.origin &&
      url.protocol === appUrl.protocol &&
      url.pathname === appUrl.pathname &&
      url.search === appUrl.search
    );
  } catch {
    return false;
  }
}

export function externalUrl(candidate: string): string | null {
  try {
    const url = new URL(candidate);
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      url.username ||
      url.password
    ) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

export function registerAppIpc(rendererUrl: string): void {
  ipcMain.handle(IPC_PING, (event, message: unknown) => {
    if (
      !event.senderFrame ||
      event.senderFrame !== event.sender.mainFrame ||
      !isAppUrl(event.senderFrame.url, rendererUrl)
    ) {
      throw new Error('Untrusted IPC sender');
    }
    if (typeof message !== 'string' || message.length > 1024) {
      throw new Error('Ping requires a string of at most 1024 characters');
    }
    return `IPC test: pong (${message})`;
  });
}
