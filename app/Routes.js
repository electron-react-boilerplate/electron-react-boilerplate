import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';

import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';

const CounterPageComponent = Loadable({
  loader: () => import('./containers/CounterPage'),
  loading: () => <div>Loading...</div>
});

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPageComponent} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
