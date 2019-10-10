// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer
} from 'electron-redux';
import createRootReducer from '../reducers';
import type { counterStateType } from '../reducers/types';
import getHistory from './storeHistory';

const configureStore = (
  initialState?: counterStateType,
  scope: string = 'main'
) => {
  const history = getHistory(scope);
  const rootReducer = createRootReducer(history, scope);

  let middleware = [thunk];

  if (scope === 'renderer') {
    const router = routerMiddleware(history);
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
