module.exports = process.env.NODE_ENV === 'production'
  ? require('./configureStore.production')   // eslint-disable-line global-require
  : require('./configureStore.development'); // eslint-disable-line global-require
