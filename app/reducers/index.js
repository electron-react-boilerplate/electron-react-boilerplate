// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import token from './token';
import holdFor from './holdfor';

const rootReducer = combineReducers({
  counter,
  token,
  holdFor,
  router,
});

export default rootReducer;
