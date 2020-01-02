module.exports = {
  extends: 'erb',
  plugins: [
    'prettier/@typescript-eslint',
    'airbnb-typescript',
    '@typescript-eslint'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  }
}
