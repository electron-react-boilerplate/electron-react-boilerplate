import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
    App: {
      fullScreenApp(): void;
      fullScreenExitApp(): void;
      CloseApp(): void;
      minimizeApp(): void;
      maximizeApp(): void;
      restoreApp(): void;
    }
  }
}

export {};
