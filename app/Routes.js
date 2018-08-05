/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';
import routes from './constants/routes.json';
import App from './containers/App';

export function LoadableHelper(opts = {}) {
  return Loadable(
    Object.assign(
      {
        loading: <div>Loading component</div>,
        delay: 200,
        timeout: 10
      },
      opts
    )
  );
}

export default () => (
  <App>
    <Switch>
      <Route
        key={Math.random()}
        path={routes.COUNTER}
        component={LoadableHelper({
          loader: () => import('./containers/CounterPage')
        })}
      />
      <Route
        key={Math.random()}
        path={routes.HOME}
        component={LoadableHelper({
          loader: () => import('./containers/HomePage')
        })}
      />
    </Switch>
  </App>
);
