// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import token from './token';

const rootReducer = combineReducers({
  counter,
  token,
  router,
});

export default rootReducer;
