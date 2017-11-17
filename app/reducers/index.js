// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import Api from './Api';

const rootReducer = combineReducers({
  Api,
  router,
});

export default rootReducer;
