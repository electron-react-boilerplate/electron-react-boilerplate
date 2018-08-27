/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import PresentPage from './containers/Present';

export default () => (
  <App>
    <Switch>
      <Route path={routes.PRESENT} component={PresentPage} />
      <Route path={routes.LOGIN} component={LoginPage} />
    </Switch>
  </App>
);
