/**
 * The Test Lsit state selectors
 */

import { createSelector } from 'reselect';

import { initialState, makePath } from '../reducers/gallery';

const selectGallery = state => state.get('gallery', initialState);

const makeSelectLoading = (moduleId, galleryId, searchQuery) =>
  createSelector(
    selectGallery,
    galleryState => galleryState.getIn([makePath({ moduleId, galleryId, searchQuery }), 'loading']),
  );

const makeSelectError = (moduleId, galleryId, searchQuery) =>
  createSelector(
    selectGallery,
    galleryState => galleryState.getIn([makePath({ moduleId, galleryId, searchQuery }), 'error']),
  );

const makeSelectPageNumber = (moduleId, galleryId, searchQuery) =>
  createSelector(
    selectGallery,
    galleryState => galleryState.getIn([makePath({ moduleId, galleryId, searchQuery }), 'pageNumber']),
  );

const makeSelectHasNextPage = (moduleId, galleryId, searchQuery) =>
  createSelector(
    selectGallery,
    galleryState => galleryState.getIn([makePath({ moduleId, galleryId, searchQuery }), 'hasNextPage']),
  );

const makeSelectScrollPosition = (moduleId, galleryId, searchQuery) =>
  createSelector(
    selectGallery,
    galleryState => galleryState.getIn([makePath({ moduleId, galleryId, searchQuery }), 'scrollPosition']),
  );

const makeSelectOldWidth = (moduleId, galleryId, searchQuery) =>
  createSelector(
    selectGallery,
    galleryState => galleryState.getIn([makePath({ moduleId, galleryId, searchQuery }), 'oldWidth']),
  );

const makeSelectItemsList = (moduleId, galleryId, searchQuery) =>
  createSelector(
    selectGallery,
    galleryState => galleryState.getIn([makePath({ moduleId, galleryId, searchQuery }), 'itemsList']).toJS(),
  );

const makeSelectItems = (moduleId, galleryId, searchQuery) =>
  createSelector(
    selectGallery,
    galleryState => galleryState.getIn([makePath({ moduleId, galleryId, searchQuery }), 'items']).toJS(),
  );

const makeSelectItem = (moduleId, galleryId, searchQuery, id) =>
  createSelector(
    selectGallery,
    galleryState => galleryState.getIn([makePath({ moduleId, galleryId, searchQuery }), 'items', `${id}`]).toJS(),
  );

export {
  selectGallery,
  makeSelectPageNumber,
  makeSelectLoading,
  makeSelectError,
  makeSelectHasNextPage,
  makeSelectItem,
  makeSelectItemsList,
  makeSelectItems,
  makeSelectScrollPosition,
  makeSelectOldWidth,
};
