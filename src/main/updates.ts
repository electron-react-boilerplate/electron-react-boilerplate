import { app } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

let started = false;

export default function startAutoUpdates(): void {
  if (!app.isPackaged || started) return;
  started = true;
  log.transports.file.level = 'info';
  autoUpdater.logger = log;
  autoUpdater.on('error', (error: Error) => {
    log.error('Auto-update error', error);
  });
  // Also catch failures before the updater can emit an error event.
  void autoUpdater.checkForUpdatesAndNotify().catch((error: unknown) => {
    log.error('Failed to check for updates', error);
  });
}
