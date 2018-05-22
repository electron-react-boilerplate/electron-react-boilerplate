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
      <Redirect exact from="/" to={navigationConstants.NAVIGATION_BUNDLES} />
      <PrivateRoute exact path={navigationConstants.NAVIGATION_BUNDLES} component={BundlesPage} />
      <Route exact path={navigationConstants.NAVIGATION_BUNDLES_DEMO} component={BundlesPage} />
    </Switch>
  </App>
);

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

const PropsRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => renderMergedProps(component, routeProps, rest)}
  />
);
