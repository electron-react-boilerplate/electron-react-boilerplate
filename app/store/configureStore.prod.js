import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import createReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();
const history = createHashHistory();
const rootReducer = createReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(sagaMiddleware, router);

function configureStore(initialState) {
  const store = createStore(rootReducer, fromJS(initialState), enhancer);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  return store;
}

export default { configureStore, history };
