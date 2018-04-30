import { bundleFilterConstants } from '../constants/bundleFilter.constants';

export const bundleFilterActions = {
  updateSearchInput,
  addSearchMatch,
  clearSearch
};

export default bundleFilterActions;

function updateSearchInput(searchInput, bundles) {
  return dispatch => {
    if (searchInput.length > 0) {
      return { type: bundleFilterConstants.UPDATE_SEARCH_INPUT, searchInput, bundles };
    }
    dispatch(clearSearch());
  };
}

function addSearchMatch(bundle) {
  return { type: bundleFilterConstants.ADD_SEARCH_MATCH, bundle };
}

function clearSearch() {
  return { type: bundleFilterConstants.CLEAR_SEARCH_RESULTS };
}
