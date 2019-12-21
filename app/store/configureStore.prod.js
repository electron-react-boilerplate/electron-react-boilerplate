// @flow
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import type { counterStateType } from '../reducers/types';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const middleware = [...getDefaultMiddleware(), router];

function configuredStore(initialState?: counterStateType) {
  return configureStore<*, counterStateType, *>({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware
  });
}

export default { configuredStore, history };
