/** @jest-environment node */
jest.mock('electron', () => ({ app: { isPackaged: false } }));
jest.mock('electron-updater', () => ({
  autoUpdater: { on: jest.fn(), checkForUpdatesAndNotify: jest.fn() },
}));
jest.mock('electron-log', () => ({
  transports: { file: { level: '' } },
  error: jest.fn(),
}));

beforeEach(() => {
  jest.resetModules();
});

test('development startup does not contact the update service', () => {
  const { autoUpdater } = require('electron-updater');
  require('../main/updates').default();
  expect(autoUpdater.checkForUpdatesAndNotify).not.toHaveBeenCalled();
});

test('packaged startup initializes updates once and handles rejection', async () => {
  const { app } = require('electron');
  const { autoUpdater } = require('electron-updater');
  const log = require('electron-log');
  const failure = new Error('offline');
  app.isPackaged = true;
  autoUpdater.checkForUpdatesAndNotify.mockRejectedValue(failure);
  const start = require('../main/updates').default;
  start();
  start();
  await Promise.resolve();
  expect(autoUpdater.checkForUpdatesAndNotify).toHaveBeenCalledTimes(1);
  expect(autoUpdater.on).toHaveBeenCalledWith('error', expect.any(Function));
  expect(log.error).toHaveBeenCalledWith(
    'Failed to check for updates',
    failure,
  );
});
