// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import errorReporting from './errorReporting';

const rootReducer = combineReducers({
  counter,
  errorReporting,
  router
});

export default rootReducer;
