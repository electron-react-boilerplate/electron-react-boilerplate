import { crashReporter, ipcMain, dialog } from 'electron';

import {
  getCrashReporterOptions,
  IPC_SET_ERROR_REPORTING,
  IPC_DANGER_THROW_ERROR_NOT_FOR_PRODUCTION,
  IPC_DANGER_CRASH_NOT_FOR_PRODUCTION
} from './errorHandlerConfig';

// replace with your error reporting tool/service
// eslint-disable-next-line no-unused-vars
const errorReportingService = error => {
  console.log('error has been reported!');
};

class mainProcessErrorHandler {
  isReporting = false;
  handleUncaughtExceptions = true;
  constructor(opts) {
    this.validateConstructorOpts(opts);
    const { webContents } = opts;
    this.webContents = webContents;
  }
  init() {
    ipcMain.on(IPC_SET_ERROR_REPORTING, this.onIpcSetErrorReporting);
    if (this.handleUncaughtExceptions) {
      process.on('uncaughtException', this.onUncaughtException);
    }
    // recommended: check if isReporting is set to true in local db
    // call this.startReporting()

    // REMOVE FOR PRODUCTION
    if (process.env.NODE_ENV === 'development') {
      ipcMain.on(
        IPC_DANGER_THROW_ERROR_NOT_FOR_PRODUCTION,
        this.onDangerousTestErrorFromRenderer
      );
      ipcMain.on(
        IPC_DANGER_CRASH_NOT_FOR_PRODUCTION,
        this.onDangerousCrashFromRenderer
      );
    }
  }
  startReporting() {
    if (this.isReporting) {
      console.warn('error reporting is already on');
      return;
    }
    console.log('starting to report errors');
    crashReporter.start({
      ...getCrashReporterOptions('main'),
      uploadToServer: true
    });
    this.isReporting = true;
    // recommended: save isReporting new value to local db
  }
  stopReporting() {
    if (!this.isReporting) {
      console.warn('error reporting is already off');
      return;
    }
    console.log('stopping to report errors');
    crashReporter.start({
      ...getCrashReporterOptions('main'),
      uploadToServer: false
    });
    this.isReporting = false;
    // recommended: save isReporting new value to local db
  }
  onUncaughtException = error => {
    this.report(error);
    // TODO :: compare to electron native uncaught error
    dialog.showErrorBox(
      `${error.message} (We suggest you restart the app)`,
      error.stack
    );
  };
  report(error) {
    console.error('error in main process', error);
    if (!this.isReporting) {
      return;
    }
    // replace with your error reporting tool/service
    errorReportingService(error);
  }
  onIpcSetErrorReporting = (evt, nextIsReporting) => {
    if (nextIsReporting) {
      this.startReporting();
    } else {
      this.stopReporting();
    }
  };
  // eslint-disable-next-line class-methods-use-this
  validateConstructorOpts(opts) {
    if (!opts.webContents) {
      throw new Error('pass win.webContents to constructor');
    }
  }
  // REMOVE FOR PRODUCTION
  onDangerousTestErrorFromRenderer = () => {
    throw new Error('test error from renderer');
  };
  // REMOVE FOR PRODUCTION
  onDangerousCrashFromRenderer = () => {
    process.crash();
  };
}

export default mainProcessErrorHandler;
