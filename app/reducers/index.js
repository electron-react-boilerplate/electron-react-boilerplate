// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import editor from './editor';
import explorer from './explorer';
import config from './config';
import results from './results';
import uiStyle from './uiStyle';
import jobs from './jobs';
import datasets from './datasets';

const rootReducer = combineReducers({
  editor,
  config,
  results,
  routing,
  uiStyle,
  jobs,
  datasets,
  explorer
});

export default rootReducer;
