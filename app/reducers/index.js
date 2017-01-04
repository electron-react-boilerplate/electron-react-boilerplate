// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import editor from './editor';
import config from './config';
import results from './results';
import uiStyle from './uiStyle';

const rootReducer = combineReducers({
  editor,
  config,
  results,
  routing,
  uiStyle
});

export default rootReducer;
