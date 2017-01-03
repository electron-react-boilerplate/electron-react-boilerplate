import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import generateMenuTemplate from './utils/menu';
import './app.global.css';
const {app, Menu} = require('electron').remote

// Hack: Exporting Store to have access in nativeDialogs
export const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

// Generate and Render the Electron Native Menus
const template = generateMenuTemplate();
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
