import spawn from 'cross-spawn';
import path from 'path';

const pattern =
  process.argv[2] === 'e2e'
    ? 'test/e2e/.+\\.spec\\.js'
    : 'test/(?!e2e/)[^/]+/.+\\.spec\\.js$';

const result = spawn.sync(
  path.normalize('./node_modules/.bin/jest'),
  [pattern, ...process.argv.slice(2)],
  { stdio: 'inherit' }
);

process.exit(result.status);
