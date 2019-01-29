import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    counter
  });
}
