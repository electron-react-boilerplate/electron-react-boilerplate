/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, session, ipcMain } from 'electron';
import downloadMgr from 'electron-dl';
import MenuBuilder from './menu';
import { autoUpdaterServices } from './main-process/autoUpdater.services';
import { navigationConstants } from './constants/navigation.constants';
import { ipcRendererConstants } from './constants/ipcRenderer.constants';

downloadMgr();

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
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


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html#${navigationConstants.NAVIGATION_BUNDLES}`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
    const autoUpdater = autoUpdaterServices.setupAutoUpdater(mainWindow);
    const menuBuilder = new MenuBuilder(mainWindow, autoUpdater);
    menuBuilder.buildMenu();

    autoUpdater.logger.info('Request checkForUpdatesAndNotify');
    autoUpdater.checkForUpdatesAndNotify();

    const baseUrl = process.env.HTTP_DBL_DOT_LOCAL_FLASK_API;
    const filter = {
      urls: [`${baseUrl}/*`]
    };
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
      if (authorizationValue) {
        // NOTE: eslint complains about 'details'
        // ("Assignment to property of function parameter 'details'..."),
        // but it's the only way to work to get this to work
        // see https://github.com/electron/electron/blob/master/docs/api/web-request.md#class-webrequest
        details.requestHeaders[HEADER_AUTHORIZATION] = authorizationValue;
      }
      // console.log({ details });
      callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

const HEADER_AUTHORIZATION = 'Authorization';
let authorizationValue = null;
ipcMain.on(ipcRendererConstants.KEY_IPC_USER_AUTHENTICATION, (event, authentication) => {
  if (authentication && authentication.loggedIn) {
    const jwt = authentication.user.auth_token;
    authorizationValue = `Bearer ${jwt}`;
  } else {
    authorizationValue = null;
  }
});
