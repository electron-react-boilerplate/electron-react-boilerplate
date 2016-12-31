// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import editor from './editor';
import config from './config';

const rootReducer = combineReducers({
  counter,
  editor,
  config,
  routing
});

export default rootReducer;
