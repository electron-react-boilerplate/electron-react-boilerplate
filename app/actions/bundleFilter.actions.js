import split from 'split-string';
import { findChunks } from 'highlight-words-core';
import { bundleFilterConstants } from '../constants/bundleFilter.constants';

export const bundleFilterActions = {
  updateSearchInput,
  addSearchMatch,
  clearSearch
};

export default bundleFilterActions;

export function updateSearchInput(searchInput, bundles) {
  return dispatch => {
    const trimmedSearchInput = searchInput.trim();
    const searchKeywords = split(searchInput, { separator: ' ' });
    if (trimmedSearchInput.length > 0) {
      dispatch({
        type: bundleFilterConstants.UPDATE_SEARCH_INPUT,
        searchInput: trimmedSearchInput,
        searchKeywords,
        bundles
      });
      updateAllSearchMatches(dispatch, bundles.items, searchKeywords);
    } else {
      dispatch(clearSearch());
    }
  };

  /*
  findChunks({
    autoEscape,
    caseSensitive,
    sanitize,
    searchWords,
    textToHighlight})
  */
  function updateAllSearchMatches(dispatch, searchableBundles, searchKeywords) {
    const chunksAcrossBundles = {};
    searchableBundles.forEach((searchableBundle) => {
      const chunksInBundle = {};
      const matchesInBundle = {};
      Object.values(searchableBundle.displayAs).forEach((searchable) => {
        let chunksForSearchable = chunksAcrossBundles[searchable];
        if (!chunksForSearchable) {
          chunksForSearchable = findChunks({
            searchWords: searchKeywords,
            textToHighlight: searchable
          });
          chunksAcrossBundles[searchable] = chunksForSearchable;
        }
        chunksInBundle[searchable] = chunksForSearchable;
        if (chunksForSearchable.length > 0) {
          matchesInBundle[searchable] = chunksForSearchable;
        }
      });
      if (Object.keys(matchesInBundle).length > 0) {
        dispatch(addSearchMatch(searchableBundle, chunksInBundle, matchesInBundle));
      }
    });
  }
}

export function addSearchMatch(bundle, chunks, matches) {
  return {
    type: bundleFilterConstants.ADD_SEARCH_MATCH, bundle, chunks, matches
  };
}

export function clearSearch() {
  return { type: bundleFilterConstants.CLEAR_SEARCH_RESULTS };
}
