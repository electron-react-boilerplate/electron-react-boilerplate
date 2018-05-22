// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import { authentication } from './authentication.reducer';
import { bundles } from './bundles.reducer';
import { bundlesFilter } from './bundlesFilter.reducer';
import { bundlesSaveTo } from './bundlesSaveTo.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  counter,
  router,
  authentication,
  bundles,
  bundlesFilter,
  bundlesSaveTo,
  alert
});

export default rootReducer;
