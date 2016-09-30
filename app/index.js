import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const rootElement = document.getElementById('root');

let app;

if (module.hot) {
  const { AppContainer } = require('react-hot-loader'); // eslint-disable-line global-require

  app = (
    <AppContainer>
      <Root store={store} history={history} routes={routes} />
    </AppContainer>
  );

  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <NewRoot store={store} history={history} routes={routes} />
      </AppContainer>,
      rootElement
    );
  });
} else {
  app = <Root store={store} history={history} routes={routes} />;
}

render(app, rootElement);
