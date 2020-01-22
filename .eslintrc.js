module.exports = {
  extends: 'erb/typescript',
  rules: {
    'import/no-extraneous-dependencies': 'off'
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  }
};
