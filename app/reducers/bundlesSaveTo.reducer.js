import { bundleConstants } from '../constants/bundle.constants';

export function bundlesSaveTo(state = {}, action) {
  switch (action.type) {
    case bundleConstants.SAVETO_REQUEST: {
      const resourcePathsBytesTransfered = action.resourcePaths
        .reduce((acc, resourcePath) => {
          acc[resourcePath] = 0;
          return acc;
        }, {});
      return {
        ...state,
        savedToHistory: {
          ...state.savedToHistory,
          ...{
            [action.id]: {
              totalBytesToDownload: action.totalBytesToDownload,
              totalBytesDownloaded: 0,
              resourcePathsBytesTransfered
            }
          }
        }
      };
    } case bundleConstants.SAVETO_UPDATED: {
      const bundleToUpdate = state.savedToHistory[action.id];
      const originalResourcePathsBytesTransfered = bundleToUpdate.resourcePathsBytesTransfered;
      const resourcePathBytesTransferedOriginal = originalResourcePathsBytesTransfered[action.resourcePath];
      const resourceBytesDiff = action.resourceTotalBytesDownloaded - resourcePathBytesTransferedOriginal;
      const totalBytesDownloaded = bundleToUpdate.totalBytesDownloaded + resourceBytesDiff;
      const resourcePathsBytesTransfered = {
        ...originalResourcePathsBytesTransfered,
        [action.resourcePath]: action.resourceTotalBytesDownloaded
      };
      const updatedBundle = { ...bundleToUpdate, totalBytesDownloaded, resourcePathsBytesTransfered };
      return {
        ...state,
        savedToHistory: {
          ...state.savedToHistory,
          [action.id]: updatedBundle
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
