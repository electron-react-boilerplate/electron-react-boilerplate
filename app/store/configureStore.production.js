// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';
import createActionBuffer from 'redux-action-buffer';
import rootReducer from '../reducers';
import type { counterStateType } from '../reducers/counter';

const router = routerMiddleware(hashHistory);

const enhancers = [];
enhancers.push(applyMiddleware(thunk, router, createActionBuffer(REHYDRATE)));
enhancers.push(autoRehydrate());
const enhancer = compose(...enhancers);

export default function configureStore(initialState?: counterStateType) {
  return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
}
