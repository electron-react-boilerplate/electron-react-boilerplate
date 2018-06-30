// @flow
import pjson from '../../package.json';

export const extraAttributes = {
  NODE_ENV: process.env.NODE_ENV,
  appVersion: pjson.version
};

export const getCrashReporterOptions = (processType: 'renderer' | 'main') => ({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'http://localhost:4000/',
  extra: { ...extraAttributes, processType }
});

export const IPC_SET_ERROR_REPORTING = 'ipcSetErrorReporting';
export const IPC_DANGER_THROW_ERROR_NOT_FOR_PRODUCTION =
  'ipcDangerThrowErrorNotForProduction';
export const IPC_DANGER_CRASH_NOT_FOR_PRODUCTION =
  'ipcDangerCrashNotForProduction';
