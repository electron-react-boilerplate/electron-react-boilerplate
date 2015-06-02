# electron-react-boilerplate

[![NPM version][npm-image]][npm-url]
[![Dependency Status][david_img]][david_site]

> [Electron](http://electron.atom.io/) application boilerplate based on [React](https://facebook.github.io/react/), [React Router](http://rackt.github.io/react-router/), [Webpack](http://webpack.github.io/docs/), [React Hot Loader](http://gaearon.github.io/react-hot-loader/)

## Install

Install dependencies.

```bash
$ npm install
```

## Run

```bash
npm run hot-dev-server
npm run start-hot
```

To start a react-hot electron app development !

> If you are using `OS X` and you place your Electron in `/Applications` folder, it will be fine. Otherwise you should see [Run your app](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md#run-your-app) document for run this on your computer.

## Package

```
npm run package
```

#### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon

Use `electron-packager` to pack your app for darwin (osx), linux and win32 (windows) platform. After build, you will see them in `release` folder.

`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.

#### Default Ignore modules

We add some module's `peerDependencies` to ignore option as default for application size reduction.

- `babel-core` is required by `babel-loader` and its size is ~19 MB
- `node-libs-browser` is required by `webpack` and its size is ~3MB.

> **Note:** If you want to use any above modules in runtime, for example: `require('babel/register')`, you should move them form `devDependencies` to `dependencies`.

## To Do

- simplify webpack config
- yeoman generator

## License
MIT © [C. T. Lin](https://github.com/chentsulin)

[npm-image]: https://img.shields.io/npm/v/electron-react-boilerplate.svg?style=flat-square
[npm-url]: https://npmjs.org/package/electron-react-boilerplate
[david_img]: https://img.shields.io/david/chentsulin/electron-react-boilerplate.svg
[david_site]: https://david-dm.org/chentsulin/electron-react-boilerplate
