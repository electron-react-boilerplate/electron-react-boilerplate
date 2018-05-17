import { bundleConstants } from '../constants/bundle.constants';

export function bundles(state = {}, action) {
  switch (action.type) {
    case bundleConstants.FETCH_REQUEST:
      return {
        loading: true
      };
    case bundleConstants.FETCH_SUCCESS:
      return {
        items: action.bundles.map(bundle => updateDisplayAs(bundle))
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
    case bundleConstants.SAVETO_REQUEST: {
      return updateProgress(action.id, 0);
    }
    case bundleConstants.SAVETO_UPDATED: {
      const progress = Math.floor((action.bundleBytesSaved / action.bundleBytesToSave) * 100);
      return updateProgress(action.id, progress);
    }
    case bundleConstants.UPDATE_PROGRESS: {
      return updateProgress(action.id, action.progress);
    }
    case bundleConstants.TOGGLE_MODE_PAUSE_RESUME: {
      const updatedItems = forkArray(
        state.items,
        bundle => bundle.id === action.id,
        bundle => buildToggledBundle(bundle)
      );
      return {
        ...state,
        items: updatedItems
      };
    }
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

  function updateProgress(bundleId, progress) {
    const items = state.items.map(bundle => (bundle.id === bundleId
      ? updateDisplayAs({ ...bundle, progress })
      : bundle));
    return {
      ...state,
      items
    };
  }
}
export default bundles;

function forkArray(array, condition, createItem) {
  return array.map((item, index) => (condition(item, index) ? createItem(item) : item));
}

function buildToggledBundle(bundle) {
  const newMode = bundle.status === 'NOT_STARTED' || bundle.mode === 'PAUSED' ? 'RUNNING' : 'PAUSED';
  const newStatus = bundle.status === 'NOT_STARTED' ? `${bundle.task}ING` : bundle.status;
  const updatedBundle = {
    ...bundle,
    status: newStatus,
    mode: newMode,
  };
  return updateDisplayAs(updatedBundle);
}

function updateDisplayAs(bundle) {
  return { ...bundle, ...formatDisplayAs(bundle) };
}


function formatDisplayAs(bundle) {
  return {
    displayAs: {
      name: bundle.name || bundle.nameDisplayAs,
      revision: `Revision ${bundle.revision || '0'}`,
      status: formatStatus(bundle)
    }
  };
}

function formatStatus(bundle) {
  const formattedProgress = formatProgress(bundle);
  const uploadingMsg = `Uploading ${formattedProgress}`;
  const downloadingMsg = `Downloading ${formattedProgress}`;
  let newStatusDisplayAs;
  if (bundle.status === 'NOT_STARTED') {
    newStatusDisplayAs = 'Download';
  } else if (bundle.status === 'UPLOADING') {
    newStatusDisplayAs = (bundle.mode === 'PAUSED' ? `Resume Uploading ${formattedProgress}` : uploadingMsg);
  } else if (bundle.status === 'DOWNLOADING') {
    newStatusDisplayAs = (bundle.mode === 'PAUSED' ? `Resume Downloading ${formattedProgress}` : downloadingMsg);
  } else if (bundle.status === 'COMPLETED') {
    newStatusDisplayAs = `${bundle.task}ED`;
  } else {
    newStatusDisplayAs = bundle.statusDisplayAs || bundle.status;
  }
  return newStatusDisplayAs;
}

function formatProgress(bundle) {
  const progress = bundle.progress ? bundle.progress : 0;
  return `(${progress}%)`;
}
