import { bundleConstants } from '../constants/bundle.constants';

export function bundlesSaveTo(state = {}, action) {
  switch (action.type) {
    case bundleConstants.SAVETO_REQUEST:
      return {
        ...state,
        downloadItems: { ...state.downloadItems, ...{ [action.id]: action.downloadItem } }
      };
    case bundleConstants.SAVETO_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
export default bundlesSaveTo;
