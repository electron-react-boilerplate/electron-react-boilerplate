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
              folderName: action.folderName,
              totalBytesToSavedTo: action.totalBytesToSavedTo,
              totalBytesSavedTo: 0,
              resourcePathsBytesTransfered
            }
          }
        }
      };
    } case bundleConstants.SAVETO_UPDATED: {
      const bundleToUpdate = state.savedToHistory[action.id];
      const originalResourcePathsBytesTransfered = bundleToUpdate.resourcePathsBytesTransfered;
      const resourcePathBytesTransferedOriginal = originalResourcePathsBytesTransfered[action.resourcePath];
      const resourceBytesDiff = action.resourceTotalBytesSavedTo - resourcePathBytesTransferedOriginal;
      const totalBytesSavedTo = bundleToUpdate.totalBytesSavedTo + resourceBytesDiff;
      const resourcePathsBytesTransfered = {
        ...originalResourcePathsBytesTransfered,
        [action.resourcePath]: action.resourceTotalBytesSavedTo
      };
      const updatedBundle = { ...bundleToUpdate, totalBytesSavedTo, resourcePathsBytesTransfered };
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
