import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';

import Routes from '../Routes';
import LanguageProvider from './LanguageProvider';

export default class Root extends Component {
  render() {
    const { store, history, messages } = this.props;

    return (
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
