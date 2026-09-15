const { createRequire } = require('node:module');
const { fixupPluginRules } = require('@eslint/compat');
const js = require('@eslint/js');
const globals = require('globals');
const toolingRequire = createRequire(
  require.resolve('./.erb/tooling/package.json'),
);
const tsPlugin = toolingRequire('@typescript-eslint/eslint-plugin');
const tsParser = toolingRequire('@typescript-eslint/parser');
const react = fixupPluginRules(require('eslint-plugin-react'));
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = fixupPluginRules(require('eslint-plugin-jsx-a11y'));
const imports = fixupPluginRules(require('eslint-plugin-import'));
const jest = toolingRequire('eslint-plugin-jest');
const promise = require('eslint-plugin-promise');
const compat = require('eslint-plugin-compat');
const prettier = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '.erb/dll/**',
      'release/app/dist/**',
      'release/build/**',
      'coverage/**',
      '**/*.css.d.ts',
      '**/*.sass.d.ts',
      '**/*.scss.d.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: imports,
      promise,
      compat,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...js.configs.recommended.rules,
      ...imports.configs.recommended.rules,
      'import/no-unresolved': 'off',
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...promise.configs.recommended.rules,
      ...compat.configs.recommended.rules,
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['src/**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}'],
    plugins: { jest },
    languageOptions: { globals: globals.jest },
    rules: jest.configs.recommended.rules,
  },
  { files: ['**/*.{ts,tsx}'], rules: { 'no-undef': 'off' } },
  prettier,
];
