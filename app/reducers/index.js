// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import { authentication } from './authentication.reducer';
import { bundles } from './bundles.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  counter,
  router,
  authentication,
  bundles,
  alert
});

export default rootReducer;
