import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';

const HomePage = React.lazy(() => import('./containers/HomePage'));
const CounterPage = React.lazy(() => import('./containers/CounterPage'));

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
