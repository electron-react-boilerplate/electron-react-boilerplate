import { crashReporter, ipcRenderer } from 'electron';

import {
  getCrashReporterOptions,
  IPC_SET_ERROR_REPORTING,
  IPC_DANGER_THROW_ERROR_NOT_FOR_PRODUCTION,
  IPC_DANGER_CRASH_NOT_FOR_PRODUCTION
} from './errorHandlerConfig';

// replace with your error reporting tool/service
const errorReportingService = error => {
  // eslint-disable-line no-unused-vars
  console.log('error has been reported!');
};

class mainProcessErrorHandler {
  isReporting = false;

  init() {
    window.addEventListener('error', this.onUncaughtWindowError);
    // recommended: check if isReporting is set to true in local db
    // call this.startReporting()
  }
  startReporting() {
    if (this.isReporting) {
      console.warn('error reporting is already on');
      return;
    }
    console.log('starting to report errors');
    ipcRenderer.send(IPC_SET_ERROR_REPORTING, true);
    crashReporter.start({
      ...getCrashReporterOptions('renderer'),
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
    ipcRenderer.send(IPC_SET_ERROR_REPORTING, false);
    console.log('stopping to report errors');
    crashReporter.start({
      ...getCrashReporterOptions('renderer'),
      uploadToServer: false
    });
    this.isReporting = false;
    // recommended: save isReporting new value to local db
  }
  onUncaughtWindowError = (errorEvent: ErrorEvent) => {
    // stop window from logging error to console
    errorEvent.preventDefault();
    // since we handle it ourselves here
    this.report(errorEvent.error);
  };
  report(error) {
    console.error('error in renderer process', error);
    if (!this.isReporting) {
      return;
    }
    // replace with your error reporting tool/service
    errorReportingService(error);
  }
  // REMOVE FOR PRODUCTION
  // eslint-disable-next-line class-methods-use-this
  sendDangerousTestErrorToMain() {
    if (process.env.NODE_ENV === 'development') {
      ipcRenderer.send(IPC_DANGER_THROW_ERROR_NOT_FOR_PRODUCTION, true);
    }
  }
  // REMOVE FOR PRODUCTION
  // eslint-disable-next-line class-methods-use-this
  sendDangerousTestCrashToMain() {
    if (process.env.NODE_ENV === 'development') {
      ipcRenderer.send(IPC_DANGER_CRASH_NOT_FOR_PRODUCTION, true);
    }
  }
}

export default mainProcessErrorHandler;
