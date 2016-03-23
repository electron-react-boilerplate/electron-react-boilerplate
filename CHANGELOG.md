# 0.9.0 (2016.3.23)

#### Improvements

- **Added [redux-logger](https://github.com/fcomb/redux-logger)**
- **Upgraded [react-router-redux](https://github.com/reactjs/react-router-redux) to v4**
- **Upgraded dependencies**
- **Added `npm run dev` command:** [#162](https://github.com/chentsulin/electron-react-boilerplate/pull/162)
- **electron to v0.37.2**

#### Breaking Changes

- **css module as default:** [#154](https://github.com/chentsulin/electron-react-boilerplate/pull/154).
- **set default NODE_ENV to production:** [#140](https://github.com/chentsulin/electron-react-boilerplate/issues/140)


# 0.8.0 (2016.2.17)

#### Bug fixed

- **Fix lint errors**
- **Fix Webpack publicPath for production builds**: [#119](https://github.com/chentsulin/electron-react-boilerplate/issues/119).
- **package script now chooses correct OS icon extension**

#### Improvements

- **babel 6**
- **Upgrade Dependencies**
- **Enable CSS source maps**
- **Add json-loader**: [#128](https://github.com/chentsulin/electron-react-boilerplate/issues/128).
- **react-router 2.0 and react-router-redux 3.0**


# 0.7.1 (2015.12.27)

#### Bug fixed

- **Fixed npm script on windows 10:** [#103](https://github.com/chentsulin/electron-react-boilerplate/issues/103).
- **history and react-router version bump**: [#109](https://github.com/chentsulin/electron-react-boilerplate/issues/109), [#110](https://github.com/chentsulin/electron-react-boilerplate/pull/110).

#### Improvements

- **electron 0.36**



# 0.7.0 (2015.12.16)

#### Bug fixed

- **Fixed process.env.NODE_ENV variable in webpack:** [#74](https://github.com/chentsulin/electron-react-boilerplate/pull/74).
- **add missing object-assign**: [#76](https://github.com/chentsulin/electron-react-boilerplate/pull/76).
- **packaging in npm@3:** [#77](https://github.com/chentsulin/electron-react-boilerplate/pull/77).
- **compatibility in windows:** [#100](https://github.com/chentsulin/electron-react-boilerplate/pull/100).
- **disable chrome debugger in production env:** [#102](https://github.com/chentsulin/electron-react-boilerplate/pull/102).

#### Improvements

- **redux**
- **css-modules**
- **upgrade to react-router 1.x**
- **unit tests**
- **e2e tests**
- **travis-ci**
- **upgrade to electron 0.35.x**
- **use es2015**
- **check dev engine for node and npm**


# 0.6.5 (2015.11.7)

#### Improvements

- **Bump style-loader to 0.13**
- **Bump css-loader to 0.22**


# 0.6.4 (2015.10.27)

#### Improvements

- **Bump electron-debug to 0.3**


# 0.6.3 (2015.10.26)

#### Improvements

- **Initialize ExtractTextPlugin once:** [#64](https://github.com/chentsulin/electron-react-boilerplate/issues/64).


# 0.6.2 (2015.10.18)

#### Bug fixed

- **Babel plugins production env not be set properly:** [#57](https://github.com/chentsulin/electron-react-boilerplate/issues/57).


# 0.6.1 (2015.10.17)

#### Improvements

- **Bump electron to v0.34.0**


# 0.6.0 (2015.10.16)

#### Breaking Changes

- **From react-hot-loader to react-transform**


# 0.5.2 (2015.10.15)

#### Improvements

- **Run tests with babel-register:** [#29](https://github.com/chentsulin/electron-react-boilerplate/issues/29).


# 0.5.1 (2015.10.12)

#### Bug fixed

- **Fix #51:** use `path.join(__dirname` instead of `./`.


# 0.5.0 (2015.10.11)

#### Improvements

- **Simplify webpack config** see [#50](https://github.com/chentsulin/electron-react-boilerplate/pull/50).

#### Breaking Changes

- **webpack configs**
- **port changed:** changed default port from 2992 to 3000.
- **npm scripts:** remove `start-dev` and `dev-server`. rename `hot-dev-server` to `hot-server`.


# 0.4.3 (2015.9.22)

#### Bug fixed

- **Fix #45 zeromq crash:** bump version of `electron-prebuilt`.


# 0.4.2 (2015.9.15)

#### Bug fixed

- **run start-hot breaks chrome refresh(CTRL+R) (#42)**: bump `electron-debug` to `0.2.1`


# 0.4.1 (2015.9.11)

#### Improvements

- **use electron-prebuilt version for packaging (#33)**


# 0.4.0 (2015.9.5)

#### Improvements

- **update dependencies**


# 0.3.0 (2015.8.31)

#### Improvements

- **eslint-config-airbnb**


# 0.2.10 (2015.8.27)

#### Features

- **custom placeholder icon**

#### Improvements

- **electron-renderer as target:** via [webpack-target-electron-renderer](https://github.com/chentsulin/webpack-target-electron-renderer)


# 0.2.9 (2015.8.18)

#### Bug fixed

- **Fix hot-reload**


# 0.2.8 (2015.8.13)

#### Improvements

- **bump electron-debug**
- **babelrc**
- **organize webpack scripts**


# 0.2.7 (2015.7.9)

#### Bug fixed

- **defaultProps:** fix typos.


# 0.2.6 (2015.7.3)

#### Features

- **menu**

#### Bug fixed

- **package.js:** include webpack build.


# 0.2.5 (2015.7.1)

#### Features

- **NPM Script:** support multi-platform
- **package:** `--all` option


# 0.2.4 (2015.6.9)

#### Bug fixed

- **Eslint:** typo, [#17](https://github.com/chentsulin/electron-react-boilerplate/issues/17) and improve `.eslintrc`


# 0.2.3 (2015.6.3)

#### Features

- **Package Version:** use latest release electron version as default
- **Ignore Large peerDependencies**

#### Bug fixed

- **Npm Script:** typo, [#6](https://github.com/chentsulin/electron-react-boilerplate/pull/6)
- **Missing css:** [#7](https://github.com/chentsulin/electron-react-boilerplate/pull/7)


# 0.2.2 (2015.6.2)

#### Features

- **electron-debug**

#### Bug fixed

- **Webpack:** add `.json` and `.node` to extensions for imitating node require.
- **Webpack:** set `node_modules` to externals for native module support.


# 0.2.1 (2015.5.30)

#### Bug fixed

- **Webpack:** #1, change build target to `atom`.


# 0.2.0 (2015.5.30)

#### Features

- **Ignore:** `test`, `tools`, `release` folder and devDependencies in `package.json`.
- **Support asar**
- **Support icon**


# 0.1.0 (2015.5.27)

#### Features

- **Webpack:** babel, react-hot, ...
- **Flux:** actions, api, components, containers, stores..
- **Package:** darwin (osx), linux and win32 (windows) platform.
