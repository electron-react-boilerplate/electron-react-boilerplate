import { bundleFilterConstants } from '../constants/bundleFilter.constants';

export function bundlesFilter(state = { isSearchActive: false }, action) {
  switch (action.type) {
    case bundleFilterConstants.UPDATE_SEARCH_INPUT: {
      const bundles = { ...action.bundles };
      return {
        isSearchActive: true,
        searchInput: action.searchInput,
        searchKeywords: action.searchKeywords,
        bundles,
        searchResults: {
          chunks: {},
          foundChunks: {},
          bundlesMatching: {},
        }
      };
    } case bundleFilterConstants.ADD_SEARCH_MATCH: {
      const oldBundlesMatching = state.searchResults.bundlesMatching;
      const oldChunks = state.searchResults.chunks;
      const oldMatches = state.searchResults.matches;
      const key = action.bundle.id;
      const newMatchingBundle = { [key]: action.bundle };
      const newChunks = action.chunks;
      const newMatches = action.matches;
      return {
        ...state,
        searchResults: {
          bundlesMatching: { ...oldBundlesMatching, ...newMatchingBundle },
          chunks: { ...oldChunks, ...newChunks },
          matches: { ...oldMatches, ...newMatches }
        }
      };
    } case bundleFilterConstants.CLEAR_SEARCH_RESULTS:
      return {
        isSearchActive: false,
        searchInput: '',
        searchKeywords: [],
        searchResults: {}
      };
    default:
      return state;
  }
}
export default bundlesFilter;
