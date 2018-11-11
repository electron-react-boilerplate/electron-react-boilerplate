/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import counterReducer from './counter';
import languageProviderReducer from './language';

const rootReducer = history =>
  combineReducers({
    counter: counterReducer,
    language: languageProviderReducer,
    router: connectRouter(history)
  });

export default rootReducer;
