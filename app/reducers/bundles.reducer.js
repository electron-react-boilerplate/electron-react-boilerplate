import { bundleConstants } from '../constants/bundle.constants';

export function bundles(state = {}, action) {
  switch (action.type) {
    case bundleConstants.FETCH_REQUEST:
      return {
        loading: true
      };
    case bundleConstants.FETCH_SUCCESS:
      return {
        items: action.bundles
      };
    case bundleConstants.FETCH_FAILURE:
      return {
        error: action.error
      };
    case bundleConstants.DELETE_REQUEST:
      // add 'deleting:true' property to bundle being deleted
      return {
        ...state,
        items: state.items.map(bundle =>
          (bundle.id === action.id
            ? { ...bundle, deleting: true }
            : bundle))
      };
    case bundleConstants.TOGGLE_SELECT: {
      const selectedBundle = state.selectedBundle && state.selectedBundle.id === action.id ?
        {} : state.items.find(bundle => bundle.id === action.id);
      return {
        selectedBundle,
        items: state.items
      };
    }
    case bundleConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to bundle
      return {
        ...state,
        items: state.items.map(bundle => {
          if (bundle.id === action.id) {
            // make copy of bundle without 'deleting:true' property
            const { deleting, ...bundleCopy } = bundle;
            // return copy of bundle with 'deleteError:[error]' property
            return { ...bundleCopy, deleteError: action.error };
          }
          return bundle;
        })
      };
    default:
      return state;
  }
}

export default bundles;
