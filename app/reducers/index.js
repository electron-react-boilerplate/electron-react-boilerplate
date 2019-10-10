// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';

export default function createRootReducer(
  history: History,
  scope: string = 'main'
) {
  return combineReducers<{}, *>({
    ...(scope === 'renderer' && { router: connectRouter(history) }),
    counter
  });
}
