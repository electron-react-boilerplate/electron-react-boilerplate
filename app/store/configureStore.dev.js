import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import { createHashHistory } from 'history';
import {
  routerMiddleware,
  routerActions
} from 'connected-react-router/immutable';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import appActions from '../actions';

const history = createHashHistory();

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Saga Middleware
  middleware.push(sagaMiddleware);

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
    ...appActions,
    ...routerActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Initital state
  const initialState = Immutable.Map();

  // Create Store
  const store = createStore(
    rootReducer(history),
    Immutable.fromJS(initialState),
    enhancer
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(rootReducer(history))
    );
  }

  return store;
};

export default { configureStore, history };
