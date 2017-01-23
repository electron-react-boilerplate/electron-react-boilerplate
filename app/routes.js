// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Editor from './containers/Editor';
import Explorer from './containers/Explorer';
import ConfigForm from './containers/ConfigForm';
import Results from './containers/Results';
import { listDatasets, pollJobStatus } from './utils/jesFtp';

export default (
  <Route path="/" component={App}>
    <Route path="/editor" component={Editor} />
    <Route path="/config" component={ConfigForm} />
    <Route path="/results" component={Results} onEnter={pollJobStatus} />
    <Route path="/explorer" component={Explorer} onEnter={listDatasets} />
    <IndexRoute component={Editor} />
  </Route>
);
