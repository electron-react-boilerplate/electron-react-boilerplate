import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux';
import rootReducer from '../reducers';

import * as counterActions from '../actions/counter';

export default (initialState: Object, scope = 'main') => {
  console.log('initialState', initialState, scope);
  // Redux Configuration
  let middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  if (scope === 'main') {
    const logger = createLogger({
      level: 'info',
      collapsed: true
    });
    middleware.push(logger);
  }

  // Router Middleware
  if (scope === 'renderer') {
    const router = routerMiddleware(hashHistory);
    middleware.push(router);
  }

  // Redux DevTools Configuration
  let composeEnhancers = compose;
  if (scope === 'renderer') {
    const actionCreators = {
      ...counterActions,
      push,
    };
    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
        actionCreators,
      }) :
      compose;
    /* eslint-enable no-underscore-dangle */
  }

  // Electron Redux Configuration
  if (scope === 'renderer') {
    middleware = [
      forwardToMain,
      ...middleware,
    ];
  }
  if (scope === 'main') {
    middleware = [
      triggerAlias,
      ...middleware,
      forwardToRenderer,
    ];
  }

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (!process.env.NODE_ENV && module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
};
