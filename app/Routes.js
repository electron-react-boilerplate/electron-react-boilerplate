import React from 'react';
import { Switch, Route } from 'react-router';

import App from './containers/App';
import HomePage from './containers/HomePage';
import Gallery from './containers/GalleryPage';
import NotFound from './components/NotFound';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/(gallery|search)/:moduleId/:galleryId?/:searchQuery?" component={Gallery} />
      <Route path="" component={NotFound} />
    </Switch>
  </App>
);
