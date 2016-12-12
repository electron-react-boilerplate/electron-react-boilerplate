// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import isRenderer from 'is-electron-renderer';
import counter from './counter';

let reducers = {
  counter,
};

if (isRenderer) {
  reducers = {
    ...reducers,
    routing
  };
}

const rootReducer = combineReducers({ ...reducers });

export default rootReducer;
