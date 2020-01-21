import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
var history = createHashHistory();
var rootReducer = createRootReducer(history);
var router = routerMiddleware(history);
var enhancer = applyMiddleware(thunk, router);
function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
export default { configureStore: configureStore, history: history };
//# sourceMappingURL=configureStore.prod.js.map
