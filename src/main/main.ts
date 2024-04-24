/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import Store from 'electron-store';
import fs from 'fs';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog,
  globalShortcut,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const store = new Store();

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
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
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1366,
    height: 728,
    autoHideMenuBar: true,
    icon: getAssetPath('icon.png'),
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

  ipcMain.handle('save-gcode', (event, data) => {
    dialog
      .showSaveDialog(mainWindow!, {
        title: 'Save GCode',
        defaultPath: path.join(app.getPath('documents'), 'gcode.dat'),
        filters: [{ name: 'GCode', extensions: ['dat'] }],
      })
      .then((result) => {
        if (!result.canceled && result.filePath) {
          fs.writeFile(result.filePath, data, (err) => {
            if (err) {
              console.error(err);
            } else {
              event.sender.send('gcode-saved', data);
            }
          });
        }
      })
      .catch((err) => {
        console.error('Erro ao mostrar caixa de diálogo', err);
      });
  });

  ipcMain.handle('open-file', async () => {
    const { filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Arquivos Personalizados', extensions: ['gzm'] }],
    });

    if (filePaths && filePaths.length > 0) {
      const data = fs.readFileSync(filePaths[0], 'utf-8');
      return {
        data: JSON.parse(data),
        path: filePaths[0],
      };
    }

    return null;
  });

  ipcMain.handle('save-file-as', async (_, content) => {
    const { filePath } = await dialog.showSaveDialog({
      title: 'Salvar como...',
      filters: [{ name: 'Arquivos Personalizados', extensions: ['gzm'] }],
      defaultPath: path.join(app.getPath('documents'), '.gzm'),
    });

    if (filePath) {
      fs.writeFileSync(filePath, content);
    }

    return filePath;
  });

  ipcMain.handle('save-file', async (_, content, filePath) => {
    try {
      fs.writeFileSync(filePath, content);
      return { success: true, message: 'Arquivo salvo com sucesso' };
    } catch (error) {
      console.error('Erro ao salvar o arquivo', error);
      return { success: false, message: 'Erro ao salvar o arquivo' };
    }
  });

  ipcMain.handle('quit-app', () => {
    app.quit();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});

ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

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
    createWindow();

    if (isDebug) {
      await installExtensions();
    }

    const shortcuts = [
      {
        key: 'CommandOrControl+O',
        callback: () => {
          if (mainWindow) mainWindow.webContents.send('shortcut-pressed-o');
          else console.error('mainWindow not defined');
        },
      },
      {
        key: 'CommandOrControl+S',
        callback: () => {
          if (mainWindow) mainWindow.webContents.send('shortcut-pressed-s');
          else console.error('mainWindow not defined');
        },
      },
      {
        key: 'CommandOrControl+Shift+S',
        callback: () => {
          if (mainWindow)
            mainWindow.webContents.send('shortcut-pressed-shift-s');
          else console.error('mainWindow not defined');
        },
      },
      {
        key: 'CommandOrControl+Q',
        callback: () => {
          app.quit();
        },
      },
    ];

    if (mainWindow) {
      mainWindow.on('focus', () => {
        shortcuts.forEach(({ key, callback }) => {
          const ret = globalShortcut.register(key, callback);

          if (!ret)
            console.log(`Falha ao registrar o atalho de teclado: ${key}`);

          console.log(
            `Atalho de teclado registrado: ${key}`,
            globalShortcut.isRegistered(key),
          );
        });
      });

      mainWindow.on('blur', () => {
        globalShortcut.unregisterAll();
      });
    } else {
      console.error('mainWindow not defined');
    }

    app.on('will-quit', () => {
      globalShortcut.unregisterAll();
    });
  })
  .catch(console.log);
