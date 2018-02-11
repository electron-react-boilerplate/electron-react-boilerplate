/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import CounterPage from './containers/CounterPage';
import PresentPage from './containers/Present';

export default () => (
  <App>
    <Switch>
      <Route path="/present" component={PresentPage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </App>
);
