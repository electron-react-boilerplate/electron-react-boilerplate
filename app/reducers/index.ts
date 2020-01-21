import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { HashHistory } from 'history';
import counter from './counter';

export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, Record<string, any>>({
    router: connectRouter(history),
    counter
  });
}
