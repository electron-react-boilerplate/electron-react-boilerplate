/**
 * Gets the next batch of items
 */
import { put, select, takeLatest, all, call } from 'redux-saga/effects';

import { loadImageAsync } from '../imageLoader';
import { LOAD_ITEMS, itemsLoaded, itemsLoadingError, itemLoaded, itemLoadingError } from '../actions/gallery';
import { makeSelectPageNumber } from '../selectors/gallery';
import {
  makeSelectCurrentModuleId,
  makeSelectCurrentGalleryId,
  makeSelectModule,
  makeSelectCurrentSearchQuery,
} from '../selectors/global';

export function* getItem(moduleId, galleryId, searchQuery, item) {
  try {
    // Load item
    const img = yield call(loadImageAsync, item.image);

    // Finish
    yield put(
      itemLoaded(moduleId, galleryId, searchQuery, {
        ...item,
        width: img.width,
        height: img.height,
      }),
    );
  } catch (error) {
    console.error('Failed to load item', error); // eslint-disable-line no-console
    yield put(itemLoadingError(moduleId, galleryId, searchQuery, error));
  }
}

/**
 * Items request/response handler
 */
export function* getItems() {
  const moduleId = yield select(makeSelectCurrentModuleId());
  const galleryId = yield select(makeSelectCurrentGalleryId());
  const searchQuery = yield select(makeSelectCurrentSearchQuery());
  const currentModule = yield select(makeSelectModule(moduleId));
  const { module } = currentModule;

  try {
    // Select page number from store
    const page = yield select(makeSelectPageNumber(moduleId, galleryId, searchQuery));

    // Get urls and galelry info
    let result = {};
    if (searchQuery) {
      result = yield call(module.searchGalleriesAsync.bind(module), searchQuery, page);
    } else if (galleryId) {
      result = yield call(module.getGalleryAsync.bind(module), galleryId, page);
    } else {
      result = yield call(module.getGalleriesAsync.bind(module), page);
    }

    // Load all
    yield all(result.items.map(item => call(getItem, moduleId, galleryId, searchQuery, item)));

    // Finish
    yield put(itemsLoaded(moduleId, galleryId, searchQuery, result.hasNextPage));
  } catch (error) {
    console.error('Failed to load items', error); // eslint-disable-line no-console
    yield put(itemsLoadingError(moduleId, galleryId, searchQuery, error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* gallerySaga() {
  // Watches for LOAD_ITEMS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_ITEMS, getItems);
}
