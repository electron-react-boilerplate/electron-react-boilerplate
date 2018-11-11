/**
 * Test List actions
 */
export const SAVE_SCROLL_POSITION = 'redux/Gallery/SAVE_SCROLL_POSITION';
export const MARK_ITEM = 'redux/Gallery/MARK_ITEM';
export const LOAD_ITEMS = 'redux/Gallery/LOAD_ITEMS';
export const LOAD_ITEMS_SUCCESS = 'redux/Gallery/LOAD_ITEMS_SUCCESS';
export const LOAD_ITEMS_ERROR = 'redux/Gallery/LOAD_ITEMS_ERROR';
export const LOAD_ITEM_SUCCESS = 'redux/Gallery/LOAD_ITEM_SUCCESS';
export const LOAD_ITEM_ERROR = 'redux/Gallery/LOAD_ITEM_ERROR';

/**
 * Mark an item.
 *
 * @param {string | number} moduleId - The module Id.
 * @param {string | number} galleryId - The gallery Id.
 * @param {string} searchQuery - The search query text.
 * @param {string} id - The item Id.
 * @param {boolean} marked - The new item marked state.
 * @return {object} - An action object with a type of MARK_ITEM
 */
export function markItem(moduleId, galleryId, searchQuery, id, marked) {
  return {
    type: MARK_ITEM,
    payload: {
      id,
      marked,
    },
    meta: {
      moduleId,
      galleryId,
      searchQuery,
    },
  };
}

/**
 * Saves scroll position for later.
 *
 * @param {string | number} moduleId - The module Id.
 * @param {string | number} galleryId - The gallery Id.
 * @param {string} searchQuery - The search query text.
 * @param {number} scrollPosition - The scroll position.
 * @param {number} oldWidth - The width when the scroll position was saved.
 * @return {object} - An action object with a type of SAVE_SCROLL_POSITION.
 */
export function saveScrollPosition(moduleId, galleryId, searchQuery, scrollPosition, oldWidth = 0) {
  return {
    type: SAVE_SCROLL_POSITION,
    payload: {
      scrollPosition,
      oldWidth,
    },
    meta: {
      moduleId,
      galleryId,
      searchQuery,
    },
  };
}

/**
 * Load the items, this action starts the request saga.
 *
 * @param {string | number} moduleId - The module Id.
 * @param {string | number} galleryId - The gallery Id.
 * @param {string} searchQuery - The search query text.
 * @return {object} - An action object with a type of LOAD_ITEMS.
 */
export function loadItems(moduleId, galleryId, searchQuery) {
  return {
    type: LOAD_ITEMS,
    meta: {
      moduleId,
      galleryId,
      searchQuery,
    },
  };
}

/**
 * Dispatched when the items are loaded by the request saga.
 *
 * @param {string | number} moduleId - The module Id.
 * @param {string | number} galleryId - The gallery Id.
 * @param {string} searchQuery - The search query text.
 * @param {boolean} hasNextPage - Flag indicating galelry has more pages
 * @return {object} - An action object with a type of LOAD_ITEMS_SUCCESS.
 */
export function itemsLoaded(moduleId, galleryId, searchQuery, hasNextPage) {
  return {
    type: LOAD_ITEMS_SUCCESS,
    payload: {
      hasNextPage,
    },
    meta: {
      moduleId,
      galleryId,
      searchQuery,
    },
  };
}

/**
 * Dispatched when loading the items fails.
 *
 * @param {string | number} moduleId - The module Id.
 * @param {string | number} galleryId - The gallery Id.
 * @param {string} searchQuery - The search query text.
 * @param  {object} error - The error.
 * @return {object} - An action object with a type of LOAD_ITEMS_ERROR passing the error.
 */
export function itemsLoadingError(moduleId, galleryId, searchQuery, error) {
  return {
    type: LOAD_ITEMS_ERROR,
    payload: error,
    meta: {
      moduleId,
      galleryId,
      searchQuery,
    },
  };
}

/**
 * Dispatched when an item is loaded by the request saga.
 *
 * @param {string | number} moduleId - The module Id.
 * @param {string | number} galleryId - The gallery Id.
 * @param {string} searchQuery - The search query text.
 * @param  {*} item - The item.
 * @return {object} - An action object with a type of LOAD_ITEM_SUCCESS passing the item.
 */
export function itemLoaded(moduleId, galleryId, searchQuery, item) {
  return {
    type: LOAD_ITEM_SUCCESS,
    payload: item,
    meta: {
      moduleId,
      galleryId,
      searchQuery,
    },
  };
}

/**
 * Dispatched when loading the items fails.
 *
 * @param {string | number} moduleId - The module Id.
 * @param {string | number} galleryId - The gallery Id.
 * @param {string} searchQuery - The search query text.
 * @param  {*} item - The item.
 * @param  {object} error - The error.
 * @return {object} - An action object with a type of LOAD_ITEM_ERROR passing the error.
 */
export function itemLoadingError(moduleId, galleryId, searchQuery, item, error) {
  return {
    type: LOAD_ITEM_ERROR,
    payload: {
      item,
      error,
    },
    meta: {
      moduleId,
      galleryId,
      searchQuery,
    },
  };
}
