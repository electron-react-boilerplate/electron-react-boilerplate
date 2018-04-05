/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import LoginPage from './containers/LoginPage';
import { PrivateRoute } from './components/PrivateRoute';

export default () => (
  <App>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/counter" component={CounterPage} />
      <PrivateRoute exact path="/" component={HomePage} />
    </Switch>
  </App>
);
