/**
 * App actions
 */
export const SWITCH_VIEW = 'redux/Global/SWITCH_VIEW';
export const SET_GALLERY = 'redux/Global/SET_GALLERY';
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

/**
 * Dispatched when we want to set the current module and gallery ids.
 *
 * @param {string | number} moduleId - The module Id.
 * @param {string | number} galleryId - The gallery Id.
 * @param {string} searchQuery - The search query text.
 * @return {object} - An action object with a type of SET_GALLERY
 */
export function setGallery(moduleId, galleryId, searchQuery) {
  return {
    type: SET_GALLERY,
    payload: {
      moduleId,
      galleryId,
      searchQuery,
    },
  };
}

/**
 * Switch view form list to masonry
 *
 * @return {object} - An action object with a type of SWITCH_VIEW
 */
export function switchView() {
  return {
    type: SWITCH_VIEW,
  };
}
