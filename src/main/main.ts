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
import { app, BrowserWindow, shell, ipcMain, dialog,session } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { pdfGenerator } from './services/pdfGenerator';
import { databaseReader } from './services/databaseReader';
import { wiringDiagramGenerator } from './services/wiringDiagramGenerator';

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

// Handle PDF generation request
ipcMain.handle('generate-pdf', async (event, options) => {
  try {
    const {
      systemName = 'SysName',
      date = new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
      pageNumber = 1,
    } = options || {};

    const filePath = await pdfGenerator.generatePDF({
      systemName,
      date,
      pageNumber,
    });

    return { success: true, filePath };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error: (error as Error).message };
  }
});

// Handle opening PDF file
ipcMain.handle('open-pdf', async (event, filePath) => {
  try {
    await shell.openPath(filePath);
    return { success: true };
  } catch (error) {
    console.error('Error opening PDF:', error);
    return { success: false, error: (error as Error).message };
  }
});

// Handle reading PDF file as base64
ipcMain.handle('read-pdf-file', async (event, filePath: string) => {
  try {
    const fs = require('fs').promises;
    const fileBuffer = await fs.readFile(filePath);
    const base64 = fileBuffer.toString('base64');
    return { success: true, data: base64 };
  } catch (error) {
    console.error('Error reading PDF file:', error);
    return { success: false, error: (error as Error).message };
  }
});

// Handle database file selection
ipcMain.handle('select-database-file', async () => {
  try {
    const result = await dialog.showOpenDialog({
      title: 'Select Access Database File',
      filters: [
        { name: 'Access Database', extensions: ['accdb', 'mdb'] },
        { name: 'All Files', extensions: ['*'] },
      ],
      properties: ['openFile'],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return { success: false, canceled: true };
    }

    return { success: true, filePath: result.filePaths[0] };
  } catch (error) {
    console.error('Error selecting database file:', error);
    return { success: false, error: (error as Error).message };
  }
});

// Handle database reading
ipcMain.handle('read-database', async (event, filePath: string) => {
  try {
    // Validate file
    const validation = await databaseReader.validateFile(filePath);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
        type: 'ValidationError',
      };
    }

    // Read database
    const result = await databaseReader.readAccessDatabase(filePath);
    return result;
  } catch (error) {
    console.error('Error reading database:', error);
    return {
      success: false,
      error: (error as Error).message,
      type: 'UnknownError',
    };
  }
});

// Handle wiring diagram generation from database
ipcMain.handle('generate-wiring-diagram', async (event, options: {
  systemName?: string;
  date?: string;
  pageNumber?: number;
  databaseData: any; // Should be databaseData.tables from database reader
  outputPath?: string;
}) => {
  try {
    console.log('Generating wiring diagram with data:', {
      systemName: options.systemName,
      tables: Object.keys(options.databaseData || {}),
    });

    const result = await wiringDiagramGenerator.generateMultiPageWiringDiagram({
      systemName: options.systemName || 'Wiring Diagram',
      date: options.date || new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
      pageNumber: options.pageNumber || 1,
      databaseData: options.databaseData || {},
      outputPath: options.outputPath,
    });

    return { success: true, filePath: result };
  } catch (error) {
    console.error('Error generating wiring diagram:', error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug').default();
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
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
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

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);


  app.whenReady().then(async () => {
    await session.defaultSession.clearCache();
    console.log("Cache cleared");
  });