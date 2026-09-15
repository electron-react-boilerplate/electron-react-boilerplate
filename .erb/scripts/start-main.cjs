const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');

// Pass Electron arguments as an argv array. Shell escaping of `=` differs
// between Windows and POSIX shells, including concurrently's {@} expansion.
const children = [
  spawn(
    process.execPath,
    [
      require.resolve('webpack-cli/bin/cli.js'),
      '--watch',
      '--config',
      './.erb/configs/webpack.config.main.dev.ts',
    ],
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'development',
        NODE_OPTIONS: '-r ./.erb/scripts/register.cjs --no-warnings',
      },
    },
  ),
  spawn(
    process.execPath,
    [
      path.join(
        path.dirname(require.resolve('electronmon/package.json')),
        'bin/cli.js',
      ),
      '.',
      ...process.argv.slice(2),
    ],
    { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development' } },
  ),
];

let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  process.exitCode = code;
  for (const child of children) {
    if (!child.pid || child.exitCode !== null) continue;
    if (process.platform === 'win32') {
      spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F']);
    } else child.kill('SIGTERM');
  }
}
for (const child of children) {
  child.on('exit', (code) => stop(code || 0));
  child.on('error', (error) => {
    console.error(error);
    stop(1);
  });
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
