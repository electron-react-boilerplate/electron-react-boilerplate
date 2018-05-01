import { findChunks } from 'highlight-words-core';
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
          chunks: findChunksInBundlesDisplayAsData(bundles.items, action.searchKeywords),
          bundlesMatching: {},
        }
      };
    } case bundleFilterConstants.ADD_SEARCH_MATCH: {
      const oldBundlesMatching = state.searchResults.bundlesMatching;
      const key = action.bundle.id;
      const newMatchingBundle = { [key]: action.bundle };
      return {
        ...state,
        searchResults: {
          bundlesMatching: { ...oldBundlesMatching, ...newMatchingBundle },
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

/*
 findChunks({
  autoEscape,
  caseSensitive,
  sanitize,
  searchWords,
  textToHighlight})
*/
function findChunksInBundlesDisplayAsData(bundles, searchKeywords) {
  const chunks = {};
  bundles.forEach((bundle) => {
    Object.values(bundle.displayAs).forEach((searchString) => {
      if (searchString in chunks) {
        return;
      }
      const results = findChunks({ searchWords: searchKeywords, textToHighlight: searchString });
      chunks[searchString] = results;
    });
  });
  return chunks;
}
