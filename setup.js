// Note: this file is the configuration file *only* for
// use by the boiler-room-custodian utility. the point
// of the boiler-room-custodian is to clean sample code
// from the boilerplate from initial state so that you
// can start custom development on a "blank project"
//
// For more information or to report issues please go
// to https://github.com/tstringer/boiler-room-custodian
//
// This file should remain unmodified by end users and
// should only be invoked by running `npm run cleanup`
module.exports = {
  // remove the following files as they are mostly
  // related to the sample counter page and functionality
  remove: [
    { file: 'app/actions/counter.js' },
    { file: 'app/components/Counter.css' },
    { file: 'app/components/Counter.js' },
    { file: 'app/containers/CounterPage.js' },
    { file: 'app/reducers/counter.js' },
    { file: 'test/actions/counter.spec.js' },
    { file: 'test/components/Counter.spec.js' },
    { file: 'test/containers/CounterPage.spec.js' },
    { file: 'test/reducers/counter.spec.js' },
    { file: 'CHANGELOG.md' },
    { file: 'erb-logo.png' }
  ],
  // clean the following files by either clearing them
  // (by specifying {clear: true}) or by removing lines
  // that match a regex pattern
  clean: [
    {
      file: 'app/reducers/index.js',
      pattern: /counter/
    },
    {
      file: 'app/store/configureStore.development.js',
      pattern: /counterActions/
    },
    {
      file: 'app/app.global.css',
      clear: true
    },
    {
      file: 'app/routes.js',
      pattern: /CounterPage/
    },
    {
      file: 'test/e2e.js',
      clear: true
    },
    {
      file: 'README.md',
      clear: true
    },
    {
      file: 'app/components/Home.js',
      pattern: /(h2|Link to)/
    }
  ],
  // add the following files to the project, mostly
  // related to .gitkeep for version control
  add: [
    { file: 'app/actions/.gitkeep' },
    { file: 'test/actions/.gitkeep' },
    { file: 'test/components/.gitkeep' },
    { file: 'test/containers/.gitkeep' },
    { file: 'test/reducers/.gitkeep' }
  ]
};
