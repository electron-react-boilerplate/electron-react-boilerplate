// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Editor from './containers/Editor';
import Results from './containers/Results';
import ConfigForm from './containers/ConfigForm';


export default (
  <Route path="/" component={App}>
    <Route path="/editor" component={Editor} />
    <Route path="/config" component={ConfigForm} />
    <Route path="/results" component={Results} />
    <IndexRoute component={Editor} />
  </Route>
);
