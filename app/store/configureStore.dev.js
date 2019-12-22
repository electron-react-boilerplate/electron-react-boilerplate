import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';
import { counterActions } from '../features/counter/counterSlice';
import type { counterStateType } from '../reducers/types';

const history = createHashHistory();

const rootReducer = createRootReducer(history);

const configuredStore = (initialState?: counterStateType) => {
  // Redux Configuration
  const middleware = [...getDefaultMiddleware()];

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
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...counterActions,
    ...routerActions
  };

  const devTools = {
    // Options: http://extension.remotedev.io/docs/API/Arguments.html
    actionCreators
  };

  // Create Store
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware,
    devTools
  });

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
};

export default { configuredStore, history };
