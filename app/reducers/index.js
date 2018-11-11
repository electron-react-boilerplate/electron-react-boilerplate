import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import language from './language';

export default function createRootReducer(history) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({
      router: routerReducer,
      counter,
      language
    })
  );
}
