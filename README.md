<div align="center">
<br>
<img src="https://user-images.githubusercontent.com/12294525/44203609-77d50800-a147-11e8-98f0-f2403527abdc.png" width="600px" />

</div>

<br>

<p align="center">
A boilerplate for Scalable Cross-Platform Desktop Apps based on  <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="http://webpack.github.io/docs/">Webpack</a> and <a href="https://github.com/gaearon/react-hot-loader">React Hot Loader</a> for rapid application development (HMR).
</p>

<div align="center">
<br>
<img src="https://forthebadge.com/images/badges/built-with-love.svg" />
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg" />
<img src="https://forthebadge.com/images/badges/for-you.svg" />
</div>

<br>

<div align="center">

<a href="https://facebook.github.io/react/"><img src="./internals/img/react-padded-90.png" /></a>
<a href="https://webpack.github.io/"><img src="./internals/img/webpack-padded-90.png" /></a>
<a href="http://redux.js.org/"><img src="./internals/img/redux-padded-90.png" /></a>
<a href="https://github.com/ReactTraining/react-router"><img src="./internals/img/react-router-padded-90.png" /></a>
<a href="https://flowtype.org/"><img src="./internals/img/flow-padded-90.png" /></a>
<a href="http://eslint.org/"><img src="./internals/img/eslint-padded-90.png" /></a>
<a href="https://facebook.github.io/jest/"><img src="./internals/img/jest-padded-90.png" /></a>
<a href="https://yarnpkg.com/"><img src="./internals/img/yarn-padded-90.png" /></a>

</div>

<hr>
<br>

<div align="center">

[![Build Status][travis-image]][travis-url]
[![Appveyor Build Status][appveyor-image]][appveyor-url]
[![Dependency Status][david_img]][david_site]
[![DevDependency Status][david_img_dev]][david_site_dev]
[![Github Tag][github-tag-image]][github-tag-url]
[![Join the chat at https://gitter.im/electron-react-boilerplate/Lobby](https://badges.gitter.im/electron-react-boilerplate/Lobby.svg)](https://gitter.im/electron-react-boilerplate/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate/sponsors/badge.svg)](#sponsors)

</div>

<div align="center">

![Electron Boilerplate Demo](https://cloud.githubusercontent.com/assets/3382565/10557547/b1f07a4e-74e3-11e5-8d27-79ab6947d429.gif)

</div>

## Install

- **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone --depth 1 --single-branch --branch master https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
```

And then install the dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

## Packaging for Production

To package apps for the local platform:

```bash
$ yarn package
```

## Docs
See our [complete docs here](https://electron-react-boilerplate.js.org/docs/en/installation)

## Maintainers

- [Vikram Rangaraj](https://github.com/vikr01)
- [Amila Welihinda](https://github.com/amilajack)
- [C. T. Lin](https://github.com/chentsulin)
- [Jhen-Jie Hong](https://github.com/jhen0409)

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/electron-react-boilerplate#backer)]

<a href="https://opencollective.com/electron-react-boilerplate/backer/0/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/1/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/2/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/3/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/4/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/5/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/6/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/7/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/8/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/9/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/10/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/11/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/12/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/13/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/14/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/15/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/16/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/17/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/18/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/19/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/20/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/21/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/22/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/23/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/24/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/25/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/26/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/27/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/28/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/backer/29/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/backer/29/avatar.svg"></a>

## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/electron-react-boilerplate#sponsor)]

<a href="https://opencollective.com/electron-react-boilerplate/sponsor/0/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/1/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/2/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/3/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/4/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/5/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/6/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/7/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/8/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/9/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/10/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/11/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/12/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/13/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/14/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/15/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/16/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/17/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/18/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/19/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/20/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/21/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/22/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/23/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/24/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/25/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/26/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/27/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/28/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/electron-react-boilerplate/sponsor/29/website" target="_blank"><img src="https://opencollective.com/electron-react-boilerplate/sponsor/29/avatar.svg"></a>

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

[npm-image]: https://img.shields.io/npm/v/electron-react-boilerplate.svg?style=flat-square
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
[travis-image]: https://travis-ci.com/electron-react-boilerplate/electron-react-boilerplate.svg?branch=master
[travis-url]: https://travis-ci.com/electron-react-boilerplate/electron-react-boilerplate
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/electron-react-boilerplate/electron-react-boilerplate?svg=true
[appveyor-url]: https://ci.appveyor.com/project/electron-react-boilerplate/electron-react-boilerplate/branch/master
[david_img]: https://img.shields.io/david/electron-react-boilerplate/electron-react-boilerplate.svg
[david_site]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate
[david_img_dev]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate/dev-status.svg
[david_site_dev]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate?type=dev
