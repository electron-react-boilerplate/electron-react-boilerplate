// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/counter" component={CounterPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}
