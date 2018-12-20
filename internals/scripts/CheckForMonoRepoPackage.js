const { name } = require('../../package.json');

const scopedPackageRegex = /^(@.+)\//;

const isScopedPackage = scopedPackageRegex.test(name);

module.exports = moduleName =>
  isScopedPackage && scopedPackageRegex.test(moduleName);
