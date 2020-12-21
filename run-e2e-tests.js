const fs = require('fs');
const path = require('path');
const createTestCafe = require('testcafe');

let testcafe = null;

const testcafeConfigFile = path.join(__dirname, 'src/.testcafe-electron-rc');
let testcafeConfig;
if (process.env.NODE_ENV === 'development') {
  testcafeConfig = JSON.stringify(
    {
      mainWindowUrl: './index.html',
      appPath: '.',
    },
    null,
    2
  );
} else {
  const baseURL = '/Applications/ElectronReact.app/Contents';
  testcafeConfig = JSON.stringify(
    {
      mainWindowUrl: `${baseURL}/Resources/app.asar/index.html`,
      electronPath: `${baseURL}/MacOS/ElectronReact`,
    },
    null,
    2
  );
}

fs.writeFileSync(testcafeConfigFile, testcafeConfig, 'utf-8');

createTestCafe('localhost', 1337, 1338)
  .then((tc) => {
    testcafe = tc;
    const runner = tc.createRunner();

    return runner
      .src(['./src/__tests__/*e2e.ts'])
      .browsers('electron:./src')
      .run();
  })
  .then((failedCount) => {
    // eslint-disable-next-line no-console
    console.log(`Tests failed: ${failedCount}`);
    testcafe.close();

    if (failedCount === 0) {
      return process.exit(0);
    }
    return process.exit(1);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('An unexpected error has occurred: ', error);
    testcafe.close();
    process.exit(1);
  });
