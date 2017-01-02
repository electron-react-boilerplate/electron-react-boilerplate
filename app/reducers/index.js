// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import editor from './editor';
import config from './config';
import uiStyle from './uiStyle';

const rootReducer = combineReducers({
  editor,
  config,
  routing,
  uiStyle
});

export default rootReducer;
