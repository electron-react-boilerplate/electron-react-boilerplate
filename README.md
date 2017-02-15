# Keypunch
[![Code Climate](https://codeclimate.com/github/spmcbride1201/keypunch-electron/badges/gpa.svg)](https://codeclimate.com/github/spmcbride1201/keypunch-electron) ![David-DM Dependency Badge](https://david-dm.org/spmcbride1201/keypunch-electron.svg)
<p align="center">
<img  src='./resources/images/Keypunch Icon.png'/>
</p>
Keypunch is a lightweight text editor designed to accelerate the ease of learning core IBM Mainframe languages like COBOL, PL/I, or z/Architecture Assembler by providing a dynamic hot reloading experience similar to Code School or Codecademy. Aspiring mainframe software engineers develop in an Ace 9 powered code editor, and by clicking a single easy button, Keypunch uses the `mainframe job` package to submit, retrieve, and render the output of their code alongside the code editor. By shortening the feedback loop, Keypunch hopes to accelerate the learning process of junior mainframe developers.

Because all client and Node.js logic is encapsulated in a single Electron app, Keypunch can run on corporate laptops behind the firewall. Because it uses `mainframe-job` to abstract away the details of interfacing with the mainframe's Job Entry Subsystem, Keypunch supports the long-tail of back-leveled z/OS systems. The goal is to help your developers learn to develop without a SysGen or other major impacts to your core business apps.

While this is a work in progress focused on delivering an initial MVP, this app offers a foundational platform that may be eventually enhanced to provide features such as:
* lessons for PL/1, COBOL, REXX, FORTRAN, HLASM, etc. that run entirely on the client app by parsing the JES output.
* enhancement to support z/VSE
* Use of socket.io to provide remote pair-programming for two corporate employees over the intranet.
* Gamification and Badges to encourage learning without compromising core business data.

## Screenshot
TODO

## Install

* **Note: requires a node version >= 6 and an npm version >= 3.**
* **If you have installation or compilation issues with this project, please see [the Electron React Boilerplate debugging guide](https://github.com/chentsulin/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone https://github.com/spmcbride1201/keypunch-electron.git your-project-name
```

And then install dependencies.

```bash
$ cd your-project-name && npm install
```

:bulb: *In order to remove boilerplate sample code, simply run `npm run cleanup`. After this is run, the initial sample boilerplate code will be removed in order for a clean project for starting custom dev*

## Run

Run these two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

or run two servers with one command

```bash
$ npm run dev
```

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

## Further commands

To run the application without packaging run

```bash
$ npm run build
$ npm start
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

## Build with love using
* [React Desktop](https://github.com/gabrielbull/react-desktop)
* [Electron React Boilerplate](https://github.com/chentsulin/electron-react-boilerplate) 
* [Electron](http://electron.atom.io/) 
* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux)
* [React Router](https://github.com/reactjs/react-router)
* [Webpack](http://webpack.github.io/docs/)
* [React Transform HMR](https://github.com/gaearon/react-transform-hmr)
* [Devtron](https://github.com/electron/devtron)
* [electron-debug](https://github.com/sindresorhus/electron-debug)
* [React Developer Tools](https://github.com/facebook/react-devtools) 
* [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer)
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension)

## Useful Resources
* http://www.ibm.com/support/knowledgecenter/SSLTBW_2.1.0/com.ibm.zos.v2r1.halu001/intfjesexample.htm
* http://www2.latech.edu/~acm/helloworld/mvsjcl.html

## License
MIT © [Sean McBride](https://github.com/spmcbride1201)
