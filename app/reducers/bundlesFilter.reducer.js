import { bundleFilterConstants } from '../constants/bundleFilter.constants';

export function bundlesFilter(state = { isSearchActive: false }, action) {
  switch (action.type) {
    case bundleFilterConstants.UPDATE_SEARCH_INPUT: {
      const bundles = { ...action.bundles };
      const bundleCount = bundles.length;
      return {
        isSearchActive: true,
        searchInput: action.searchInput,
        bundles,
        searchResults: {
          bundlesProcessed: bundleCount > 0 ? 0 : 100,
          bundlesMatching: {},
        }
      };
    } case bundleFilterConstants.ADD_SEARCH_MATCH: {
      const oldBundlesProcessed = state.searchResults.bundlesProcessed;
      const oldBundlesMatching = state.searchResults.bundlesMatching;
      const newMatchingBundle = { id: action.bundle.id, bundle: action.bundle };
      return {
        ...state,
        searchResults: {
          bundlesProcessed: oldBundlesProcessed + 1,
          bundlesMatching: { ...oldBundlesMatching, ...newMatchingBundle },
        }
      };
    } case bundleFilterConstants.CLEAR_SEARCH_RESULTS:
      return {
        isSearchActive: false,
        searchInput: '',
        searchResults: {}
      };
    default:
      return state;
  }
}

export default bundlesFilter;
