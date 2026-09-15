const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { _electron: electron } = require('playwright');
const { build } = require('../../package.json');

const output = path.resolve(build.directories.output);
const product = build.productName;
const candidates = {
  darwin: [
    `${process.arch === 'arm64' ? 'mac-arm64' : 'mac'}/${product}.app/Contents/MacOS/${product}`,
  ],
  win32: [`win-unpacked/${product}.exe`, `win-arm64-unpacked/${product}.exe`],
  linux: [
    'linux-unpacked/electron-react-boilerplate',
    'linux-arm64-unpacked/electron-react-boilerplate',
  ],
};
const executablePath =
  process.env.SMOKE_EXECUTABLE ||
  candidates[process.platform]
    ?.map((file) => path.join(output, file))
    .find((file) => fs.existsSync(file));

async function main() {
  assert.ok(
    executablePath,
    'Build an unpacked app with npm run package:smoke, or set SMOKE_EXECUTABLE',
  );
  const artifacts = path.join(output, 'smoke');
  fs.mkdirSync(artifacts, { recursive: true });
  const app = await electron.launch({
    executablePath,
    args:
      process.env.CI && process.platform === 'linux' ? ['--no-sandbox'] : [],
    timeout: 60_000,
    env: { ...process.env, NODE_ENV: 'production' },
  });
  const errors = [];
  const logs = [];
  const child = app.process();
  child.stdout?.on('data', (data) => logs.push(data.toString()));
  child.stderr?.on('data', (data) => logs.push(data.toString()));
  app.context().on('weberror', (error) => errors.push(error.error().message));
  let window;
  try {
    assert.equal(
      await app.evaluate(({ app: electronApp }) => electronApp.isPackaged),
      true,
    );
    window = await app.firstWindow();
    await window
      .getByRole('heading', { name: 'electron-react-boilerplate', exact: true })
      .waitFor();
    await window.waitForFunction(
      () => document.querySelector('img')?.naturalWidth > 0,
    );
    assert.equal(new URL(window.url()).protocol, 'file:');
    assert.equal(await window.getByRole('link').count(), 2);
    const reply = await window.evaluate(
      () =>
        new Promise((resolve) => {
          window.electron.ipcRenderer.once('ipc-example', resolve);
          window.electron.ipcRenderer.sendMessage('ipc-example', [
            'packaged-smoke',
          ]);
        }),
    );
    assert.equal(reply, 'IPC test: pong');
    assert.deepEqual(errors, []);
    await window.screenshot({ path: path.join(artifacts, 'packaged.png') });
  } catch (error) {
    await window
      ?.screenshot({ path: path.join(artifacts, 'failure.png') })
      .catch(() => {});
    throw error;
  } finally {
    fs.writeFileSync(path.join(artifacts, 'process.log'), logs.join(''));
    fs.writeFileSync(
      path.join(artifacts, 'renderer-errors.json'),
      JSON.stringify(errors, null, 2),
    );
    await app.close();
  }
  assert.equal(child.exitCode, 0, 'Packaged application should exit cleanly');
  console.log(
    'Packaged startup passed: production window, assets, preload IPC, no renderer errors, and clean shutdown.',
  );
}

// Bound the entire check, including IPC and teardown, so CI cannot hang.
const watchdog = setTimeout(() => {
  console.error('Packaged smoke test exceeded 120 seconds');
  process.exit(1);
}, 120_000);
main()
  .finally(() => clearTimeout(watchdog))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
