// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer
} from 'electron-redux';
import rootReducer from '../reducers';
import type { counterStateType } from '../reducers/counter';

const configureStore = (initialState?: counterStateType, scope = 'main') => {
  let middleware = [thunk];

  if (scope === 'renderer') {
    const router = routerMiddleware(hashHistory);
    middleware = [forwardToMain, router, ...middleware];
  }

  if (scope === 'main') {
    middleware = [triggerAlias, ...middleware, forwardToRenderer];
  }

  const enhancer = applyMiddleware(...middleware);

  const store = createStore(rootReducer, initialState, enhancer);

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
};

export default { configureStore };
