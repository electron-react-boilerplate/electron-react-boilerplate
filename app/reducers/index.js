// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import { authentication } from './authentication.reducer';

const rootReducer = combineReducers({
  counter,
  router,
  authentication
});

export default rootReducer;
