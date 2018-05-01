import sort from 'fast-sort';
import { bundleConstants } from '../constants/bundle.constants';
import { bundleService } from '../services/bundle.service';

export const bundleActions = {
  mockFetchAll,
  fetchAll,
  delete: removeBundle,
  toggleModePauseResume,
  toggleSelectBundle,
};

export default bundleActions;

export function mockFetchAll() {
  return dispatch => {
    dispatch(request());
    return new Promise((resolve) => {
      const mockBundles = getMockBundles();
      resolve(mockBundles);
    }).then(
      bundles => dispatch(success(bundles)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: bundleConstants.FETCH_REQUEST };
  }
  function success(bundles) {
    return { type: bundleConstants.FETCH_SUCCESS, bundles };
  }
  function failure(error) {
    return { type: bundleConstants.FETCH_FAILURE, error };
  }
}

function fetchAll() {
  return dispatch => {
    dispatch(request());

    return bundleService
      .fetchAll()
      .then(
        bundles => dispatch(success(bundles)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return { type: bundleConstants.FETCH_REQUEST };
  }
  function success(bundles) {
    return { type: bundleConstants.FETCH_SUCCESS, bundles };
  }
  function failure(error) {
    return { type: bundleConstants.FETCH_FAILURE, error };
  }
}

function removeBundle(id) {
  return dispatch => {
    dispatch(request(id));

    bundleService
      .delete(id)
      .then(() => {
        dispatch(success(id));
        return true;
      })
      .catch(error => {
        dispatch(failure(id, error));
        return true;
      });
  };

  function request(_id) {
    return { type: bundleConstants.DELETE_REQUEST, id: _id };
  }
  function success(_id) {
    return { type: bundleConstants.DELETE_SUCCESS, id: _id };
  }
  function failure(_id, error) {
    return { type: bundleConstants.DELETE_FAILURE, id: _id, error };
  }
}

export function toggleModePauseResume(id) {
  return { type: bundleConstants.TOGGLE_MODE_PAUSE_RESUME, id };
}

export function toggleSelectBundle(id) {
  return { type: bundleConstants.TOGGLE_SELECT, id };
}

function getMockBundles() {
  const bundles = [
    {
      id: 'bundle01', name: 'Test Bundle #1', revision: 3, task: 'UPLOAD', status: 'COMPLETED', selected: true,
    },
    {
      id: 'bundle02', name: 'Another Bundle', revision: 3, task: 'UPLOAD', status: 'UPLOADING', progress: 63, mode: 'PAUSED'
    },
    {
      id: 'bundle03', name: 'Audio Bundle', revision: 52, task: 'DOWNLOAD', status: 'DOWNLOADING', progress: 12, mode: 'RUNNING'
    },
    {
      id: 'bundle04', name: 'Unfinished Bundle', task: 'UPLOAD', status: 'DRAFT'
    },
    {
      id: 'bundle05', name: 'Unfinished Video Bundle', task: 'UPLOAD', status: 'DRAFT'
    },
    {
      id: 'bundle06', name: 'DBL Bundle', task: 'DOWNLOAD', status: 'NOT_STARTED'
    },
    {
      id: 'bundle07', name: 'DBL Bundle 3', task: 'DOWNLOAD', status: 'NOT_STARTED'
    },
    {
      id: 'bundle08', name: 'Audio Bundle #2', revision: 40, task: 'DOWNLOAD', status: 'COMPLETED'
    },
  ];
  const taskOrder = ['UPLOAD', 'DOWNLOAD'];
  const statusOrder = ['UPLOADING', 'DOWNLOADING', 'DRAFT', 'COMPLETED', 'NOT_STARTED'];
  const sortedBundles = sort(bundles).asc([
    (b) => statusOrder.indexOf(b.status),
    (b) => taskOrder.indexOf(b.task),
    (b) => b.name,
  ]);
  return sortedBundles;
}
