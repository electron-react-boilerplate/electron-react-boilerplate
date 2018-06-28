import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { getInitialStateRenderer } from 'electron-redux';
import Root from './containers/Root';
import { configureStore } from './store/configureStore';
import history from './store/history';
import './app.global.css';

const initialState = getInitialStateRenderer();
const store = configureStore(initialState, 'renderer');

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
