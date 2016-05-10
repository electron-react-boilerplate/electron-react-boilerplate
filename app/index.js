import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import App from './app';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const rootElement = document.getElementById('root');

if (process.env.NODE_ENV !== 'production' && module.hot) {
  const AppContainer = require('react-hot-loader').AppContainer;

  render(
    <AppContainer>
      <App store={store} history={history} />
    </AppContainer>,
    rootElement
  );

  module.hot.accept('./app', () => {
    const NextApp = require('./app');

    render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>,
      rootElement
    );
  });
} else {
  render(
    <App store={store} history={history} />,
    rootElement
  );
}
