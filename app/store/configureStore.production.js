import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers';

const reduxRouterMiddleware = syncHistory(hashHistory);
const finalCreateStore = compose(
  applyMiddleware(thunk, reduxRouterMiddleware)
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
