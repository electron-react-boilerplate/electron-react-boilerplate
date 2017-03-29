/**
 * @HACK: Babel doesn't support using modules as your `babelrc`.
 *        This file is imported by webpack configs because our
 *        webpack configs do not require `modules: false`. Node
 *        doesn't support ES6 modules at the moment so we need
 *        the `babelrc` to have `modules: true`, which is the
 *        default
 */
export default {
  presets: [
    ['env', {
      targets: { node: 'current' },
      useBuiltIns: true,
      modules: false
    }],
    'stage-0',
    'react'
  ],
  plugins: ['add-module-exports'],
  env: {
    production: {
      presets: ['react-optimize'],
      plugins: ['babel-plugin-dev-expression']
    },
    development: {
      plugins: [
        'transform-class-properties',
        'transform-es2015-classes',
        'react-hot-loader/babel',
        ['flow-runtime', {
          assert: true,
          annotate: true
        }]
      ]
    }
  }
}
