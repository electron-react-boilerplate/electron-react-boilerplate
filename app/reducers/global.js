/*
 * App reducer
 */
import { fromJS } from 'immutable';

import modules from '../modules';
import { SWITCH_VIEW, SET_GALLERY } from '../actions/global';

const initialStateBuilder = {
  modules: {},
  currentModuleId: null,
  currentGalleryId: null,
  currentSearchQuery: null,
  showMasonry: false,
};

// Load all of our modules
modules.keySeq().forEach(key => {
  initialStateBuilder.modules[key] = modules.get(key);
});

// The initial state of the App
export const initialState = fromJS(initialStateBuilder);

function globalReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SWITCH_VIEW: {
      return state.set('showMasonry', !state.get('showMasonry'));
    }
    case SET_GALLERY: {
      const { moduleId, galleryId, searchQuery } = payload;
      return state
        .set('currentModuleId', moduleId)
        .set('currentGalleryId', galleryId)
        .set('currentSearchQuery', searchQuery);
    }
    default:
      return state;
  }
}

export default globalReducer;
