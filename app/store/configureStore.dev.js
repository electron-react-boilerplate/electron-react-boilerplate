import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer
} from 'electron-redux';
import createRootReducer from '../reducers';
import * as counterActions from '../actions/counter';
import type { counterStateType } from '../reducers/types';
import getHistory from './storeHistory';

const configureStore = (
  initialState?: counterStateType,
  scope: string = 'main'
) => {
  const history = getHistory(scope);
  const rootReducer = createRootReducer(history, scope);

  // Redux Configuration
  let middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  if (scope === 'renderer') {
    const router = routerMiddleware();
    middleware = [forwardToMain, router, ...middleware];
  }

  if (scope === 'main') {
    middleware = [triggerAlias, ...middleware, forwardToRenderer];
  }

  // Redux DevTools Configuration
  const actionCreators = {
    ...counterActions,
    ...routerActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    scope === 'renderer' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? scope === 'renderer' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Options: http://extension.remotedev.io/docs/API/Arguments.html
          actionCreators
        })
      : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../reducers').default)
    );
  }

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
};

export default { configureStore };
