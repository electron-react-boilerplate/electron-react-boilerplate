import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

export default class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider {...store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}
