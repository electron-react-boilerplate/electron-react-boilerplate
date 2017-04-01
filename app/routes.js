// @flow
import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

export default (
  <Route path="/" component={App}>
    <Route path="/" component={HomePage} />
    <Route path="/counter" component={CounterPage} />
  </Route>
);
