// module.exports = {
//   extends: 'erb',
//   plugins: [
//     'prettier/@typescript-eslint',
//     'airbnb-typescript',
//     '@typescript-eslint'
//   ],
//   settings: {
//     'import/resolver': {
//       webpack: {
//         config: require.resolve('./configs/webpack.config.eslint.js')
//       }
//     }
//   }
// }

module.exports = {
  extends: [
    'plugin:import/errors',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:promise/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  overrides: [
    {
      extends: [
        'plugin:react/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:promise/recommended'
      ],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
      },
      rules: {
        'import/default': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['*.spec.ts', '*.spec.tsx'],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 'off'
      }
    }
  ],
  rules: {
    'flowtype-errors/show-errors': 'off',
    'prettier/prettier': ['error', { singleQuote: true }]
  }
};
