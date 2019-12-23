import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from './rootReducer';
import { counterActions } from './features/counter/counterSlice';
import type { counterStateType } from './types';

export const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const middleware = [...getDefaultMiddleware(), router];
let devTools = false;

const excludeLoggerEnvs = ['test', 'production'];
const shouldIncludeLogger =
  excludeLoggerEnvs.indexOf(process.env.NODE_ENV) === -1;

if (shouldIncludeLogger) {
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  middleware.push(logger);
}

if (process.env.NODE_ENV === 'development') {
  devTools = {
    // Options: http://extension.remotedev.io/docs/API/Arguments.html
    actionCreators: {
      ...counterActions,
      ...routerActions
    }
  };
}

export const configuredStore = (initialState?: counterStateType) => {
  // Create Store
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware,
    devTools
  });

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(
      './rootReducer',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./rootReducer').default)
    );
  }

  return store;
};
