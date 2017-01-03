// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Editor from './containers/Editor';
import ConfigForm from './containers/ConfigForm';


export default (
  <Route path="/" component={App}>
    <Route path="/editor" component={Editor} />
    <Route path="/config" component={ConfigForm} />
    <IndexRoute component={Editor} />
  </Route>
);
