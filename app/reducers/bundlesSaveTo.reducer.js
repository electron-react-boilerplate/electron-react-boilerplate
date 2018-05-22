import { bundleConstants } from '../constants/bundle.constants';

export function bundlesSaveTo(state = {}, action) {
  switch (action.type) {
    case bundleConstants.SAVETO_REQUEST: {
      const resourcePathsBytesSaved = action.resourcePaths
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
              folderName: action.folderName,
              bundleBytesToSave: action.bundleBytesToSave,
              bundleBytesSaved: 0,
              resourcePathsBytesSaved
            }
          }
        }
      };
    } case bundleConstants.SAVETO_UPDATED: {
      const bundleToUpdate = state.savedToHistory[action.id];
      const originalResourcePathsBytesTransfered = bundleToUpdate.resourcePathsBytesSaved;
      const resourcePathBytesTransferedOriginal = originalResourcePathsBytesTransfered[action.resourcePath];
      const resourceBytesDiff = action.resourceTotalBytesSaved - resourcePathBytesTransferedOriginal;
      const bundleBytesSaved = bundleToUpdate.bundleBytesSaved + resourceBytesDiff;
      const resourcePathsBytesSaved = {
        ...originalResourcePathsBytesTransfered,
        [action.resourcePath]: action.resourceTotalBytesSaved
      };
      const updatedBundle = { ...bundleToUpdate, bundleBytesSaved, resourcePathsBytesSaved };
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
