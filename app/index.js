import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import FontFaceObserver from 'fontfaceobserver';
import 'sanitize.css/sanitize.css';

import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import { translationMessages } from './i18n';

// Observe loading of font (to remove font, remove the <link> tag in
// the index.html file and this observer)
const robotoObserver = new FontFaceObserver('Roboto', {});

// When font is loaded, add a font-family using the font to the body
robotoObserver
  .load()
  // eslint-disable-next-line promise/always-return
  .then(() => {
    document.body.classList.add('fontLoaded');
  })
  .catch(console.warn);

// Create store
const store = configureStore();
const MOUNT_NODE = document.getElementById('root');

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
