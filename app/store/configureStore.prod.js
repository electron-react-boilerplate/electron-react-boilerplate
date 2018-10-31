// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
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

const history = createHashHistory();
const rootReducer = createRootReducer(history);

function configureStore(
  initialState?: counterStateType,
  scope: string = 'main'
) {
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

  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
