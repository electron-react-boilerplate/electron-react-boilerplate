const CheckForMonoRepoPackage = require('./CheckForMonoRepoPackage');

require('@babel/register')({
  ignore: [
    module => !CheckForMonoRepoPackage(module) && /node_modules/.test(module)
  ]
});
