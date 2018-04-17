/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import App from './containers/App';
import BundlesPage from './containers/BundlesPage';
import LoginPage from './containers/LoginPage';
import { PrivateRoute } from './components/PrivateRoute';
import { navigationConstants } from './constants/navigation.constants';

export default () => (
  <App>
    <Switch>
      <Route path={navigationConstants.NAVIGATION_LOGIN} component={LoginPage} />
      <Redirect exact from="/" to={navigationConstants.NAVIGATION_LOGIN} />
      <PrivateRoute exact path={navigationConstants.NAVIGATION_BUNDLES} component={BundlesPage} />
    </Switch>
  </App>
);
