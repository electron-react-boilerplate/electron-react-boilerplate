import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ServerPage from './containers/ServerPage';
import TablesPage from './containers/TablesPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.SERVER} component={ServerPage} />
      <Route path={routes.TABLES} component={TablesPage} />
      <Route path={routes.COUNTER} component={CounterPage} />
      {/* <Route path={routes.HOME} component={HomePage} /> */}
    </Switch>
  </App>
);
