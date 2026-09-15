const assert = require('node:assert/strict');
const { version } = require('../../release/app/package.json');

assert.equal(
  process.env.GITHUB_REF_TYPE,
  'tag',
  'Releases require a version tag',
);
assert.equal(
  process.env.GITHUB_REF_NAME,
  `v${version}`,
  'Tag must match release/app/package.json version',
);
console.log(`Verified release tag v${version}`);
