// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Editor from './containers/Editor';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';


export default (
  <Route path="/" component={App}>
    <Route path="/counter" component={CounterPage} />
    <Route path="/editor" component={Editor} />
    <IndexRoute component={HomePage} />
  </Route>
);
