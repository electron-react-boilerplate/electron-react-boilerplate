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

- --name, -n: Application Name (default: ElectronReact)
- --version, -v: Electron version (default: 0.27.1)

Use `electron-packager` to pack you app for darwin (osx), linux and win32 (windows) platform. After build, you can see them in `release` folder.

`test/`, `tools` and devDependencies in `package.json` will be ignored by default.

## To Do

- simplify webpack config
- asar support
- yeoman generator

## License
MIT © [C. T. Lin](https://github.com/chentsulin)

[npm-image]: https://img.shields.io/npm/v/electron-react-boilerplate.svg?style=flat-square
[npm-url]: https://npmjs.org/package/electron-react-boilerplate
[david_img]: https://img.shields.io/david/chentsulin/electron-react-boilerplate.svg
[david_site]: https://david-dm.org/chentsulin/electron-react-boilerplate
