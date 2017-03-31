// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './containers/App';
import Bundle from './containers/Bundle';

/* eslint flowtype-errors/show-errors: 0 */

const HomePage = () => (
  // $FlowIssue: https://github.com/facebook/flow/pull/3544
  <Bundle load={() => import('./containers/HomePage')}>
    {HomePageComponent => (HomePageComponent
      ? <HomePageComponent />
      : <div> Loading HomePage... </div>)}
  </Bundle>
);

const CounterPage = () => (
  // $FlowIssue: https://github.com/facebook/flow/pull/3544
  <Bundle load={() => import('./containers/CounterPage')}>
    {(CounterPageComponent) => (CounterPageComponent
      ? <CounterPageComponent />
      : <div> Loading CounterPage... </div>)
    }
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
