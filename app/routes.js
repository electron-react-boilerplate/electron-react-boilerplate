/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ApiExamplePage from './containers/ApiExamplePage';
import StyleGuidePage from './containers/StyleGuidePage';

export default () => (
  <App>
    <Switch>
      <Route path="/styleguide" component={StyleGuidePage} />
      <Route path="/apiExample" component={ApiExamplePage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
