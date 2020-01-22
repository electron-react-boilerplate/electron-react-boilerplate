module.exports = {
  extends: 'erb/typescript',
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  }
};
