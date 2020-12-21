import { ClientFunction } from 'testcafe';

let page;
if (process.env.NODE_ENV === 'development') {
  page = '../index.html';
} else {
  page =
    '/Applications/ElectronReact.app/Contents/Resources/app.asar/index.html';
}

fixture`Home Page`.page(page);

const getPageTitle = ClientFunction(() => document.title);

// eslint-disable-next-line jest/expect-expect,jest/no-done-callback
test('e2e', async (t) => {
  await t.expect(getPageTitle()).eql('Hello Electron React!');
});
