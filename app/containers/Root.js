// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { persistStore } from 'redux-persist';
import routes from '../routes';

type RootType = {
  store: {},
  history: {}
};

export default class Root extends Component {

  constructor() {
    super();
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistStore(this.props.store, {}, () => {
      // The state is now rehydrated
      this.setState({ rehydrated: true });
    })
  }

  render() {
    const { store, history } : RootType = this.props;

    if(!this.state.rehydrated){
      return <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Resuming...</div>
    }

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }

};
