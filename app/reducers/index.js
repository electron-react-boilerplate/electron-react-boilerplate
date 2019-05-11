// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { IHashHistory } from 'history';
import counter from './counter';

export default function createRootReducer(history: IHashHistory) {
  return combineReducers({
    router: connectRouter(history),
    counter
  });
}
