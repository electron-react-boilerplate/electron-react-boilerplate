if (process.env.NODE_ENV === 'production') {
  module.exports = require('./App.production');
} else {
  module.exports = require('./App.development');
}
