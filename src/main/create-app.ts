/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable promise/always-return */
/* eslint-disable no-console */
/* eslint-disable global-require */
import { app, BrowserWindow, ipcMain, Menu, shell, Tray } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import path from 'path';
import { resolveHtmlPath } from './util';

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

export class BuilderApp {
  private widthMainWindow = 1024;
  private heightMainWindow = 800;
  private mainWindow: BrowserWindow | undefined;
  private appIcon!: Tray;

  private isDevelopment = isDevelopment;

  private getAssetPath(...paths: string[]): string {
    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');
    return path.join(RESOURCES_PATH, ...paths);
  }

  private appUpdater() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }

  private async installExtensions() {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer
      .default(
        extensions.map((name) => installer[name]),
        forceDownload
      )
      .catch(console.log);
  }

  private async createWindow() {
    if (this.isDevelopment) {
      await this.installExtensions();
    }

    this.mainWindow = new BrowserWindow({
      show: false,
      width: this.widthMainWindow,
      height: this.heightMainWindow,
      icon: this.getAssetPath('icon.png'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
      autoHideMenuBar: true,
      frame: false,
    });

    this.mainWindow.loadURL(resolveHtmlPath('index.html'));

    this.mainWindow.on('ready-to-show', () => {
      if (!this.mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.mainWindow.minimize();
      } else {
        this.mainWindow.show();
      }
    });

    this.mainWindow.on('minimize', (event: Event) => {
      event.preventDefault();
      this.mainWindow?.minimize();
    });

    this.mainWindow.on('closed', () => {
      this.mainWindow = undefined;
    });

    // Open urls in the user's browser
    this.mainWindow.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    this.appUpdater();
  }

  private async createTray() {
    if (this.appIcon) return;

    this.appIcon = new Tray(this.getAssetPath('icon.ico'));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Abrir',
        click: () => {
          this.mainWindow?.show();
        },
      },
      {
        label: 'Minimizar',
        click: () => {
          this.mainWindow?.minimize();
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Sair',
        click: () => {
          app.quit();
        },
      },
    ]);

    this.appIcon.setContextMenu(contextMenu);
    this.appIcon.addListener('double-click', () => {
      this.mainWindow?.show();
    });
  }

  private registreEventApp() {
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
        this.createWindow();
        this.createTray();
        app.on('activate', () => {
          // On macOS it's common to re-create a window in the app when the
          // dock icon is clicked and there are no other windows open.
          if (this.mainWindow === null) {
            this.createWindow();
            this.createTray();
          }
        });
      })
      .catch(console.log);
  }

  private ipcEvents() {
    ipcMain.on('ipc-example', async (event, arg) => {
      const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
      console.log(msgTemplate(arg));
      event.reply('ipc-example', msgTemplate('pong'));
    });

    ipcMain.on('minimizeApp', async () => {
      this.mainWindow?.minimize();
    });

    ipcMain.on('closedApp', async () => {
      this.mainWindow?.hide();
    });
  }

  async run() {
    this.registreEventApp();
    this.ipcEvents();
  }
}
