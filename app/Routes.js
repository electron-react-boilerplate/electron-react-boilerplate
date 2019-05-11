import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';

const CounterPageComponent = lazy(() => import('./containers/CounterPage'));

export default () => (
  <App>
    <Suspense fallback={() => <div>Loading...</div>}>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPageComponent} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </Suspense>
  </App>
);
