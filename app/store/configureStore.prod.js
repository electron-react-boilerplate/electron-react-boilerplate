import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createReducer from '../reducers';

const history = createHashHistory();
const rootReducer = createReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState) {
  return createStore(rootReducer, fromJS(initialState), enhancer);
}

export default { configureStore, history };
