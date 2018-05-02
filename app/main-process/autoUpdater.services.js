import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

export const autoUpdaterServices = {
  setupAutoUpdater
};
export default autoUpdaterServices;

/*
 * Adapted from https://github.com/iffy/electron-updater-example/blob/master/main.js
 * This is free and unencumbered software released into the public domain.
 * See LICENSE for details
 */

function setupAutoUpdater(browserWindow) {
  //-------------------------------------------------------------------
  // Logging
  //
  // THIS SECTION IS NOT REQUIRED
  //
  // This logging setup is not required for auto-updates to work,
  // but it sure makes debugging easier :)
  //-------------------------------------------------------------------
  /*
   * from https://github.com/megahertz/electron-log
   * on Linux: ~/.config/<app name>/log.log
   * on OS X: ~/Library/Logs/<app name>/log.log
   * on Windows: %USERPROFILE%\AppData\Roaming\<app name>\log.log
   */
  autoUpdater.logger = log;
  autoUpdater.allowPrerelease = true;
  if (process.env.NODE_ENV === 'development') {
    log.transports.file.level = 'debug';
    log.transports.file.file = `${__dirname}/log-dev.txt`;
  } else {
    log.transports.file.level = 'info';
  }
  log.info(`Log file: ${log.transports.file.file}`);
  log.info('App starting...');

  //-------------------------------------------------------------------
  // Define the menu
  //
  // THIS SECTION IS NOT REQUIRED
  //-------------------------------------------------------------------
  /*
  const template = [];
  if (process.platform === 'darwin') {
  // OS X
    const name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          role: 'about'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() { app.quit(); }
        },
      ]
    });
  }
  */


  //-------------------------------------------------------------------
  // Open a window that displays the version
  //
  // THIS SECTION IS NOT REQUIRED
  //
  // This isn't required for auto-updates to work, but it's easier
  // for the app to show a window than to have to click "About" to see
  // that updates are working.
  //-------------------------------------------------------------------
  function sendStatusToWindow(text) {
    log.info(text);
    browserWindow.webContents.send('message', text);
  }
  /*
  function createDefaultWindow() {
    browserWindow = new BrowserWindow();
    browserWindow.webContents.openDevTools();
    browserWindow.on('closed', () => {
      browserWindow = null;
    });
    browserWindow.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
    return browserWindow;
  }
  */
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  });
  autoUpdater.on('update-available', () => {
    sendStatusToWindow('Update available.');
  });
  autoUpdater.on('update-not-available', () => {
    sendStatusToWindow('Update not available.');
  });
  autoUpdater.on('error', (err) => {
    sendStatusToWindow(`Error in auto-updater. ${err}`);
  });
  autoUpdater.on('download-progress', (progressObj) => {
    let logMessage = `Download speed: ${progressObj.bytesPerSecond}`;
    logMessage = `${logMessage} - Downloaded ${progressObj.percent}%`;
    logMessage = `${logMessage} (${progressObj.transferred}/${progressObj.total})`;
    sendStatusToWindow(logMessage);
  });
  autoUpdater.on('update-downloaded', () => {
    sendStatusToWindow('Update downloaded');
  });
  /*
  app.on('ready', () => {
  // Create the Menu
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    createDefaultWindow();
  });
  app.on('window-all-closed', () => {
    app.quit();
  });
   */

  //
  // CHOOSE one of the following options for Auto updates
  //

  //-------------------------------------------------------------------
  // Auto updates - Option 1 - Simplest version
  //
  // This will immediately download an update, then install when the
  // app quits.
  //-------------------------------------------------------------------
  /*
  app.on('ready', () => {
    autoUpdater.logger.info('Request checkForUpdatesAndNotify');
    autoUpdater.checkForUpdatesAndNotify();
  });
  */
  //-------------------------------------------------------------------
  // Auto updates - Option 2 - More control
  //
  // For details about these events, see the Wiki:
  // https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
  //
  // The app doesn't need to listen to any events except `update-downloaded`
  //
  // Uncomment any of the below events to listen for them.  Also,
  // look in the previous section to see them being used.
  //-------------------------------------------------------------------
  // app.on('ready', function()  {
  //   autoUpdater.checkForUpdates();
  // });
  // autoUpdater.on('checking-for-update', () => {
  // })
  // autoUpdater.on('update-available', (info) => {
  // })
  // autoUpdater.on('update-not-available', (info) => {
  // })
  // autoUpdater.on('error', (err) => {
  // })
  // autoUpdater.on('download-progress', (progressObj) => {
  // })
  // autoUpdater.on('update-downloaded', (info) => {
  //   autoUpdater.quitAndInstall();
  // })
  return autoUpdater;
}
