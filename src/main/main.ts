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
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import * as dotenv from "dotenv";
import ExcelJS from 'exceljs';
import configData from '../../assets/config.json';
import { Opportunity, CustomField, Option, Person } from '../helpers/types';

dotenv.config();

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

ipcMain.handle('read-one-pager', async (
  event, 
  selectedOpportunity: Opportunity,
  customFieldsDict: Record<number, CustomField> | undefined,
  contact: Person | undefined
) => {
  // Ensure config data was properly loaded as it's essential to execution
  if (customFieldsDict == undefined)
    throw new Error('Custom Field Dictionary was not created correctly. Make sure config is properly set');

  let onePagerPath = '';
  if (process.env.NODE_ENV === 'development') {
    // Use the original dev path
    onePagerPath = path.join(app.getAppPath(), 'assets', 'One-Pager_template.xlsx');
  } else {
    // Use the packaged path
    onePagerPath = path.join(process.resourcesPath, 'assets', 'One-Pager_template.xlsx');
  }
  const os = require('os');
  const onePagerWritePath = path.join(os.homedir(), 'New-One-Pager_template.xlsx');

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(onePagerPath);

  // Assign Copper's standard Opportunity values to relevant excel fields
  for (const [key, val] of Object.entries(configData.opportunity))
  {
    var cell = wb.getWorksheet(val.sheet)?.getCell(val.cell);
    var newCellValue = selectedOpportunity[key as keyof Opportunity];
    
    if (cell && (typeof newCellValue === 'number' || typeof newCellValue === 'string'))
      cell.value = newCellValue;
  }

  // City and State are combined in excel output, so they're handled a bit differently
  let opp_city = '';
  let opp_state = '';

  // Export Copper custom fields to excel output 
  for (const customField of selectedOpportunity.custom_fields) {
    const customFieldConfigData = customFieldsDict[customField.custom_field_definition_id];

    if (!(customFieldConfigData.name in configData.custom_opp_fields))
      continue
    const excelInfo = configData.custom_opp_fields[customFieldConfigData.name as keyof object]
    const optionsDict = customFieldConfigData.options?.reduce((acc, opt) => {
      acc[opt.id] = opt;
      return acc;
    }, {} as Record<number, Option>)

    if (customFieldConfigData.id == 327449) {
      opp_city = customField.value;
    }
    else if (customFieldConfigData.id == 327711) {
      opp_state = customField.value;
    }
    else if (['Text', 'String', 'Currency'].includes(customFieldConfigData.data_type)) {
      var cell = wb.getWorksheet(excelInfo['sheet'])?.getCell(excelInfo['cell']);
      var newTextValue: number | string = customField.value;
      
      if (cell)
        cell.value = newTextValue;
    }
    else if (customFieldConfigData.data_type == 'MultiSelect') {
      if (optionsDict == undefined)
        continue;
      const selections: string = customField.value.map((opt: number) => optionsDict[opt])
                                            .sort((a: Option,b: Option) => a.rank - b.rank)
                                            .map((opt: Option) => opt.name)
                                            .join(', ');

      var cell = wb.getWorksheet(excelInfo['sheet'])?.getCell(excelInfo['cell']);
      
      if (cell)
        cell.value = selections;    
    }
    else if (customFieldConfigData.data_type == 'Dropdown') {
      if (optionsDict == undefined)
        continue;
      
      var cell = wb.getWorksheet(excelInfo['sheet'])?.getCell(excelInfo['cell']);
      var newDropdownValue: string = optionsDict[customField.value].name;
      
      if (cell)
        cell.value = newDropdownValue;
    }
  }

  // Set Location Value
  const locationExcelInfo = configData.custom_opp_fields['Location'];
  var cell = wb.getWorksheet(locationExcelInfo['sheet'])?.getCell(locationExcelInfo['cell']);
  if (cell)
    cell.value = `${opp_city}, ${opp_state}`;

  // Get Primary Contact Info
  if (contact)
  {
    for (const [key, val] of Object.entries(configData.primary_contact)) {
      var contactCell = wb.getWorksheet(val.sheet)?.getCell(val.cell);
      var contactCellValue = contact[key as keyof Person];
    
      if (contactCell && (typeof contactCellValue === 'number' || typeof contactCellValue === 'string'))
      contactCell.value = contactCellValue;
    }
  }

  wb.xlsx.writeFile(onePagerWritePath);
  
});
ipcMain.handle('write-one-pager', async (event, writtenFile: ExcelJS.Workbook) => {
  const os = require('os');
  const onePagerPath = path.join(os.homedir(), 'New-One-Pager_template.xlsx');
  
  return await writtenFile.xlsx.writeFile(onePagerPath);
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
    width: 1024,
    height: 728,
    icon: getAssetPath('irishangelsnetwork_logo.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  mainWindow.maximize();

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
