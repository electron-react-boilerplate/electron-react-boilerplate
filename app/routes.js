import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';
import App from './containers/App';
import HomePage from './containers/HomePage';

const CounterPage = Loadable({
  loader: () => import('./containers/CounterPage'),
  loading: () => <div>Loading...</div>,
  delay: 2000,
});

export default () => (
  <App>
    <Switch>
      <Route key={Math.random()} path="/counter" component={CounterPage} />
      <Route key={Math.random()} path="/" component={HomePage} />
    </Switch>
  </App>
);
