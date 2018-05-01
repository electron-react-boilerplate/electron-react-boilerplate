import split from 'split-string';
import { bundleFilterConstants } from '../constants/bundleFilter.constants';

export const bundleFilterActions = {
  updateSearchInput,
  addSearchMatch,
  clearSearch
};

export default bundleFilterActions;

export function updateSearchInput(searchInput, bundles) {
  const trimmedSearchInput = searchInput.trim();
  const searchKeywords = split(searchInput, { separator: ' ' });
  if (trimmedSearchInput.length > 0) {
    return {
      type: bundleFilterConstants.UPDATE_SEARCH_INPUT,
      searchInput: trimmedSearchInput,
      searchKeywords,
      bundles
    };
  }
  return clearSearch();
}

function addSearchMatch(bundle) {
  return { type: bundleFilterConstants.ADD_SEARCH_MATCH, bundle };
}

function clearSearch() {
  return { type: bundleFilterConstants.CLEAR_SEARCH_RESULTS };
}
