# electron-react-boilerplate

[![NPM version][npm-image]][npm-url]
[![Dependency Status][david_img]][david_site]

> [Electron](http://electron.atom.io/) application boilerplate based on [React](https://facebook.github.io/react/), [React Router](http://rackt.github.io/react-router/), [Webpack](http://webpack.github.io/docs/), [React Hot Loader](http://gaearon.github.io/react-hot-loader/) for rapid application development

Warning: react-hot-reload maybe temporarily fail because `ws` issue with latest node and iojs   [Automattic/engine.io-client#376](https://github.com/Automattic/engine.io-client/issues/376)

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

> Please make sure you have a `electron` environment variable which is linked to your Electron binary in your terminal. Otherwise you should refer [Run your app](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md#run-your-app) document for run this on your computer.

## Package

```
npm run package
```

#### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

Use `electron-packager` to pack your app with `--all` options for darwin (osx), linux and win32 (windows) platform. After build, you will find them in `release` folder. Otherwise, you will only find one for your os.

`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.

#### Default Ignore modules

We add some module's `peerDependencies` to ignore option as default for application size reduction.

- `babel-core` is required by `babel-loader` and its size is ~19 MB
- `node-libs-browser` is required by `webpack` and its size is ~3MB.

> **Note:** If you want to use any above modules in runtime, for example: `require('babel/register')`, you should move them form `devDependencies` to `dependencies`.

## To Do

- simplify webpack config
- yeoman generator
- support react devtools when [atom/electron#915](https://github.com/atom/electron/issues/915) fixed
- prerender production html

## License
MIT © [C. T. Lin](https://github.com/chentsulin)

[npm-image]: https://img.shields.io/npm/v/electron-react-boilerplate.svg?style=flat-square
[npm-url]: https://npmjs.org/package/electron-react-boilerplate
[david_img]: https://img.shields.io/david/chentsulin/electron-react-boilerplate.svg
[david_site]: https://david-dm.org/chentsulin/electron-react-boilerplate
