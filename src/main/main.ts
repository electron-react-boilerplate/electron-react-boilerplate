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
  IpcMainInvokeEvent,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { FileObject, SaveObject } from 'types/general';
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
    width: 1024,
    height: 768,
    x: 0,
    y: 0,
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

  ipcMain.handle(
    'save-gcode',
    async (event: IpcMainInvokeEvent, generatedCodes: string[]) => {
      try {
        const response = await fetch('http://localhost:8000/save-program', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            programs: [...generatedCodes],
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Erro ao fazer a chamada de API');
      }
    },
  );

  ipcMain.handle('open-file', async (): Promise<FileObject | null> => {
    const { filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Arquivos Personalizados', extensions: ['gzm'] }],
    });

    if (filePaths && filePaths.length > 0) {
      const data = fs.readFileSync(filePaths[0], 'utf-8');
      const fileName = path.basename(filePaths[0]);
      return {
        data: JSON.parse(data),
        path: filePaths[0],
        fileName,
      };
    }

    return null;
  });

  ipcMain.handle(
    'check-file',
    async (_, filePath: string): Promise<boolean> => {
      try {
        if (fs.existsSync(filePath)) return true;
        return false;
      } catch (error) {
        console.error('Erro ao verificar o arquivo', error);
        return false;
      }
    },
  );

  ipcMain.handle(
    'save-file-as',
    async (_, content): Promise<string | undefined> => {
      const { filePath } = await dialog.showSaveDialog({
        title: 'Salvar como...',
        filters: [{ name: 'Arquivos Personalizados', extensions: ['gzm'] }],
        defaultPath: path.join(app.getPath('documents'), '.gzm'),
      });

      if (filePath) {
        fs.writeFileSync(filePath, content);
      }

      return filePath;
    },
  );

  ipcMain.handle(
    'save-file',
    async (_, content, filePath: string): Promise<SaveObject> => {
      try {
        fs.writeFileSync(filePath, content);
        return { success: true, message: 'Arquivo salvo com sucesso' };
      } catch (error) {
        console.error('Erro ao salvar o arquivo', error);
        return { success: false, message: 'Erro ao salvar o arquivo' };
      }
    },
  );

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
