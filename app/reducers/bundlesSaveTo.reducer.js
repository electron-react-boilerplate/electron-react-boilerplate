import { bundleConstants } from '../constants/bundle.constants';

export function bundlesSaveTo(state = {}, action) {
  switch (action.type) {
    case bundleConstants.SAVETO_REQUEST:
      return {
        ...state,
        downloadBundles: {
          ...state.downloadBundles,
          ...{ [action.id]: { totalBytesToDownload: action.totalBytesToDownload, totalBytesDownloaded: 0 } }
        }
      };
    case bundleConstants.SAVETO_UPDATED: {
      const bundleToUpdate = state.downloadedBundles[action.id];
      const updatedBundle = { ...bundleToUpdate, totalBytesDownloaded: bundleToUpdate.totalBytesDownloaded + action.newBytesDownloaded };
      return {
        ...state,
        downloadBundles: {
          ...state.downloadBundles,
          ...{ [action.id]: updatedBundle }
        }
      };
    }
    case bundleConstants.SAVETO_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
export default bundlesSaveTo;
