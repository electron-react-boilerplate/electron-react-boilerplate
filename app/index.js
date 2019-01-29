import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './app.global.css';

const applicationStore = {
  // TODO: Initialize application store
};

render(
  <AppContainer>
    <App store={applicationStore} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    render(
      <AppContainer>
        <NextApp store={applicationStore} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
