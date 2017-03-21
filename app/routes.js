// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './containers/App';
import Bundle from './containers/Bundle';

// Dynamic Import Flow: https://github.com/facebook/flow/pull/3544

const HomePage = () => (
  <Bundle load={() => import('./containers/HomePage')}>
    { (HomePageComponent) => (HomePageComponent ?
      <HomePage /> : <div> Loading HomePage... </div>) }
  </Bundle>
);

const CounterPage = () => (
  <Bundle load={() => import('./containers/CounterPage')}>
    { (CounterPageComponent) => (CounterPageComponent ?
      <CounterPage /> : <div> Loading CounterPage... </div>) }
  </Bundle>
);

const Routes = () => (
  <App>
    <Switch>
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);

export default Routes;
