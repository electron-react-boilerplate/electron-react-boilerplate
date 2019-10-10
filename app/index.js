import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { getInitialStateRenderer } from 'electron-redux';
import Root from './containers/Root';
import { configureStore } from './store/configureStore';
import getHistory from './store/storeHistory';
import './app.global.css';

const history = getHistory('renderer');
const initialState = getInitialStateRenderer();
const store = configureStore(initialState, 'renderer');

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
