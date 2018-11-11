import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

import { translationMessages } from './i18n';

// Create store
const store = configureStore();
const MOUNT_NODE = document.getElementById('root');

console.log('>>>', { translationMessages });

if (module.hot) {
  module.hot.accept(['./i18n', './containers/Root'], () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    // eslint-disable-next-line global-require
    const nextTranslationMessages = require('./i18n').translationMessages;

    render(
      <AppContainer>
        <NextRoot
          store={store}
          history={history}
          messages={nextTranslationMessages}
        />
      </AppContainer>,
      MOUNT_NODE
    );
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() =>
      render(
        <AppContainer>
          <Root
            store={store}
            history={history}
            messages={translationMessages}
          />
        </AppContainer>,
        MOUNT_NODE
      )
    )
    .catch(err => {
      throw err;
    });
} else {
  render(
    <AppContainer>
      <Root store={store} history={history} messages={translationMessages} />
    </AppContainer>,
    MOUNT_NODE
  );
}
