import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers';

const reduxRouterMiddleware = syncHistory(hashHistory);
const enhancer = applyMiddleware(thunk, reduxRouterMiddleware);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
