// @flow
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod').default; // eslint-disable-line global-require
} else {
  module.exports = require('./configureStore.dev').default; // eslint-disable-line global-require
}
