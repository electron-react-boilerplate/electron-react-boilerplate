/*
 * Test List reducer
 */
import { fromJS } from 'immutable';

import modules from '../modules';
import { SET_GALLERY } from '../actions/global';
import {
  SAVE_SCROLL_POSITION,
  MARK_ITEM,
  LOAD_ITEMS,
  LOAD_ITEMS_SUCCESS,
  LOAD_ITEMS_ERROR,
  LOAD_ITEM_SUCCESS,
  LOAD_ITEM_ERROR,
} from '../actions/gallery';

const initialGalleryState = {
  loading: false,
  error: false,
  hasNextPage: true,
  pageNumber: 0,
  items: {},
  itemsList: [],
  scrollPosition: -1,
  oldWidth: 0,
};

const initialStateBuilder = {}; // ['module/galleryId'] => { gallery state }

// Load all of our modules
modules.keySeq().forEach(key => {
  initialStateBuilder[key] = { ...initialGalleryState };
});

// The initial state of the App
export const initialState = fromJS(initialStateBuilder);

// fuynction for making path
export const makePath = meta => {
  const { moduleId = undefined, galleryId = undefined, searchQuery = undefined } = meta || {};
  let path = moduleId;

  if (galleryId) {
    path = `/gallery/${path}/${galleryId}`;
  }

  if (searchQuery) {
    path = `/search/${path}/${searchQuery}`;
  }

  return path;
};

function galleryReducer(state = initialState, action) {
  const { type, payload, meta } = action;
  let path = makePath(meta);

  switch (type) {
    case SET_GALLERY: {
      path = makePath(payload);

      if (!state.has(path)) {
        return state.set(path, fromJS({ ...initialGalleryState }));
      }

      return state;
    }
    case SAVE_SCROLL_POSITION: {
      const { scrollPosition, oldWidth } = payload;
      return state.setIn([path, 'scrollPosition'], scrollPosition).setIn([path, 'oldWidth'], oldWidth);
    }
    case MARK_ITEM: {
      const { id, marked } = payload;
      return state.setIn([path, 'items', `${id}`, 'marked'], marked);
    }
    case LOAD_ITEMS:
      return state
        .setIn([path, 'loading'], true)
        .setIn([path, 'error'], false)
        .setIn([path, 'pageNumber'], state.getIn([path, 'pageNumber']) + 1);
    case LOAD_ITEMS_SUCCESS: {
      return state.setIn([path, 'hasNextPage'], payload.hasNextPage).setIn([path, 'loading'], false);
    }
    case LOAD_ITEMS_ERROR:
      return state.setIn([path, 'error'], payload).setIn([path, 'loading'], false);
    case LOAD_ITEM_SUCCESS: {
      const { id } = payload;
      return state
        .setIn([path, 'items', id], fromJS(payload))
        .updateIn([path, 'itemsList'], itemsList => itemsList.push(id));
    }
    case LOAD_ITEM_ERROR: {
      const { item, error } = payload;
      if (process.env.NODE_ENV !== 'test') {
        console.warn(`Cannot load image ${item.image} in gallery ${path}`, error); // eslint-disable-line no-console
      }
      return state;
    }
    default:
      return state;
  }
}

export default galleryReducer;
