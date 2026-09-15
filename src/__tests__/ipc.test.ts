/** @jest-environment node */
import { ipcMain } from 'electron';
import { externalUrl, isAppUrl, registerAppIpc } from '../main/ipc';

jest.mock('electron', () => ({ ipcMain: { handle: jest.fn() } }));

const appUrl = 'file:///app/dist/renderer/index.html';

test('navigation accepts only the app document, including hash routes', () => {
  expect(isAppUrl(`${appUrl}#/settings`, appUrl)).toBe(true);
  expect(isAppUrl('file:///etc/passwd', appUrl)).toBe(false);
  expect(isAppUrl('file://remote/app/dist/renderer/index.html', appUrl)).toBe(
    false,
  );
  expect(isAppUrl('https://example.com/index.html', appUrl)).toBe(false);
  expect(
    isAppUrl(
      'http://localhost:1234/index.html',
      'http://localhost:1212/index.html',
    ),
  ).toBe(false);
  expect(isAppUrl('invalid', appUrl)).toBe(false);
});

test('external links allow web URLs but reject local files and OS protocols', () => {
  expect(externalUrl('https://example.com/docs')).toBe(
    'https://example.com/docs',
  );
  for (const url of [
    'file:///etc/passwd',
    'javascript:alert(1)',
    'custom:launch',
    'invalid',
    'https://user:pass@example.com',
  ]) {
    expect(externalUrl(url)).toBeNull();
  }
});

test('ping validates the sender frame and payload at runtime', async () => {
  registerAppIpc(appUrl);
  const handler = jest.mocked(ipcMain.handle).mock.calls[0][1];
  const mainFrame = { url: appUrl };
  const event = { senderFrame: mainFrame, sender: { mainFrame } } as Parameters<
    typeof handler
  >[0];
  expect(await handler(event, 'hello')).toBe('IPC test: pong (hello)');
  expect(() => handler(event, ['hello'])).toThrow('Ping requires');
  expect(() => handler(event, 'x'.repeat(1025))).toThrow('Ping requires');
  expect(() => handler({ ...event, senderFrame: null }, 'hello')).toThrow(
    'Untrusted',
  );
  expect(() =>
    handler(
      { ...event, senderFrame: { url: appUrl } } as typeof event,
      'hello',
    ),
  ).toThrow('Untrusted');
  mainFrame.url = 'https://example.com';
  expect(() => handler(event, 'hello')).toThrow('Untrusted');
});
