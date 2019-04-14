import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';

const CounterPage = lazy(() => import('./containers/CounterPage'));

const LoadingMessage = () => 'Loading...';

export default () => (
  <App>
    <Suspense fallback={<LoadingMessage />}>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </Suspense>
  </App>
);
