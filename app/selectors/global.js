/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');

const selectGlobal = state => state.get('global');

const makeSelectCurrentModuleId = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('currentModuleId'),
  );

const makeSelectCurrentGalleryId = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('currentGalleryId'),
  );

const makeSelectCurrentSearchQuery = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('currentSearchQuery'),
  );

const makeSelectModules = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('modules').toJS(),
  );

const makeSelectShowMasonry = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('showMasonry'),
  );

const makeSelectModule = moduleId =>
  createSelector(
    selectGlobal,
    globalState => globalState.getIn(['modules', moduleId]).toJS(),
  );

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.get('location').toJS(),
  );

const makeSelectRouteParams = () =>
  createSelector(
    selectRoute,
    () => {},
  );

export {
  makeSelectLocation,
  makeSelectModules,
  makeSelectModule,
  makeSelectRouteParams,
  makeSelectCurrentModuleId,
  makeSelectCurrentGalleryId,
  makeSelectCurrentSearchQuery,
  makeSelectShowMasonry,
};
