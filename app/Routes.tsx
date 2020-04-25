import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

export default function Routes() {
  return (
    <App>
      <BrowserRouter>
        <Switch>
          <Route path={routes.COUNTER} component={CounterPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </BrowserRouter>      
    </App>
  );
}
