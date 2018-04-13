// @flow
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import { alertActions } from '../actions';
import { ipcRendererConstants } from '../constants/ipcRenderer.constants';

const { ipcRenderer } = window.require('electron'); // from https://github.com/electron/electron/issues/9920

type Props = {
  store: {},
  history: {},
  authentication: {},
  dispatch: () => void
};

class Root extends Component<Props> {
  constructor(props) {
    super(props);
    const { dispatch, history, authentication } = this.props;
    // from https://github.com/chentsulin/electron-react-boilerplate/issues/293
    ipcRenderer.on(
      ipcRendererConstants.KEY_IPC_NAVIGATE,
      (evt, route) => {
        if (history.location.pathname === route) {
          return false;
        }
        history.push(route);
      }
    );
    ipcRenderer.send(ipcRendererConstants.KEY_IPC_USER_AUTHENTICATION, authentication);
    // console.log('constructor');
    // console.log(authentication);
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  componentDidUpdate(prevProps) {
    const { authentication } = this.props;
    const prevAuth = JSON.stringify(prevProps.authentication);
    const currentAuth = JSON.stringify(authentication);
    if (prevAuth !== currentAuth) {
      // console.log('componentDidUpdate');
      // console.log(currentAuth);
      ipcRenderer.send(ipcRendererConstants.KEY_IPC_USER_AUTHENTICATION, authentication);
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  return {
    authentication
  };
}

export default connect(mapStateToProps)(Root);
