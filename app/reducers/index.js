/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import galleryReducer from './gallery';
import globalReducer from './global';
import languageProviderReducer from './language';

const rootReducer = history =>
  combineReducers({
    gallery: galleryReducer,
    global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
  });

export default rootReducer;
