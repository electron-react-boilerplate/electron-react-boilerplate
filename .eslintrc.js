module.exports = {
  extends: [
    'erb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-import-module-exports': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // Disable the class-methods-use-this rule globally
    'class-methods-use-this': 'off',
    // Disable Prettier formatting rules globally
    'prettier/prettier': 'off',
    "no-console": "off",
    "@typescript-eslint/no-explicit-any":'off',
    'lines-between-class-members':'off',
     'no-useless-constructor':'off',
    'no-empty-function':'off',
    'import/prefer-default-export':'off',
    'no-empty':'off',
    'import/newline-after-import':'off',
    'promise/catch-or-return':'off',
    'promise/always-return':'off',
    'global-require':'off',
    '@typescript-eslint/no-var-requires':'off',
    'no-underscore-dangle':'off'
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      },
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts')
      },
      typescript: {}
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  }
};
