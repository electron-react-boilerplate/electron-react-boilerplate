/* eslint-disable global-require */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, Tray, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { exec } from 'child_process';
import Store from 'electron-store';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { StoredData } from '../renderer/types';
import ROGAURACORE_PATH from '../renderer/constants';

const store = new Store();

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('execute-command', (event, command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Command error: ${error.message}`);
      event.reply('command-result', { error: error.message });
    } else {
      console.error(`Command stderr: ${stderr}`);
      event.reply('command-result', { stdout, stderr });
    }
  });
});

ipcMain.handle('store-get', (event, key) => {
  return store.get(key);
});

ipcMain.handle('store-set', (event, key, value) => {
  store.set(key, value);
});

ipcMain.handle('store-delete', (event, key) => {
  store.delete(key);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    icon: getAssetPath('/icons/asus.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  mainWindow.maximize();
  mainWindow.setMenuBarVisibility(false);

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(async () => {
    const trayIconPath = app.isPackaged
      ? path.join(process.resourcesPath, 'assets', 'icons', 'asus.png')
      : path.join(__dirname, '../../assets/icons/asus.png');

    const data = store.get('dataStored');

    exec(`${ROGAURACORE_PATH} brightness 2`);

    const storedData = JSON.parse(data as any) as StoredData;

    if (storedData.mode === 'STATIC') {
      exec(`${ROGAURACORE_PATH} single_static ${storedData.color}`);
    }

    if (storedData.mode === 'RAINBOW') {
      exec(`${ROGAURACORE_PATH} rainbow_cycle ${storedData.force}`);
    }

    if (storedData.mode === 'BRIGHTNESS') {
      exec(`${ROGAURACORE_PATH} brightness ${storedData.force}`);
    }

    if (storedData.mode === 'OFF') {
      exec(`${ROGAURACORE_PATH} single_static 000000`);
    }

    if (storedData.mode === 'MULTI_STATIC') {
      exec(
        `${ROGAURACORE_PATH} multi_static ${storedData.color1} ${storedData.color2} ${storedData.color3} ${storedData.color4}`,
      );
    }

    const tray = new Tray(trayIconPath);

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show App',
        click: () => {
          createWindow();
          mainWindow?.show();
        },
      },
      {
        label: 'Hide App',
        click: () => {
          mainWindow?.hide();
        },
      },
      {
        label: 'Quit',
        click: () => {
          app.quit();
        },
      },
    ]);

    tray.on('balloon-click', () => {
      console.log('Balloon clicked');
      createWindow();
      mainWindow?.show();
    });

    tray.setToolTip('Rogauracore gui');
    tray.setContextMenu(contextMenu);

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });

    return true;
  })
  .catch((error) => {
    console.error('Failed to create window:', error);
  });
