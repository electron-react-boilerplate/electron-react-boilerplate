import sort from 'fast-sort';
import { bundleConstants } from '../constants/bundle.constants';
import { bundleService } from '../services/bundle.service';

export const bundleActions = {
  mockFetchAll,
  fetchAll,
  delete: removeBundle
};

export default bundleActions;

function getMockBundles() {
  const bundles = [
    {
      id: 'bundle01', nameDisplayAs: 'Test Bundle #1', revision: 3, task: 'UPLOAD', statusDisplayAs: 'Uploaded', status: 'COMPLETED', selected: true,
    },
    {
      id: 'bundle02', nameDisplayAs: 'Another Bundle', revision: 3, task: 'UPLOAD', statusDisplayAs: 'Paused Uploading (63%)', status: 'UPLOADING', progress: 63, mode: 'PAUSED'
    },
    {
      id: 'bundle03', nameDisplayAs: 'Audio Bundle', revision: 52, task: 'DOWNLOAD', statusDisplayAs: 'Downloading (12%)', status: 'DOWNLOADING', progress: 12, mode: 'RUNNING'
    },
    {
      id: 'bundle04', nameDisplayAs: 'Unfinished Bundle', task: 'UPLOAD', statusDisplayAs: 'Draft', status: 'DRAFT'
    },
    {
      id: 'bundle05', nameDisplayAs: 'Unfinished Video Bundle', task: 'UPLOAD', statusDisplayAs: 'Draft', status: 'DRAFT'
    },
    {
      id: 'bundle06', nameDisplayAs: 'DBL Bundle', task: 'DOWNLOAD', statusDisplayAs: 'Download', status: 'NOT_STARTED'
    },
    {
      id: 'bundle07', nameDisplayAs: 'DBL Bundle 3', task: 'DOWNLOAD', statusDisplayAs: 'Download', status: 'NOT_STARTED'
    },
    {
      id: 'bundle08', nameDisplayAs: 'Audio Bundle #2', revision: 40, task: 'DOWNLOAD', statusDisplayAs: 'Downloaded', status: 'COMPLETED'
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

function mockFetchAll() {
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
    return { type: bundleConstants.DELETE_REQUEST, _id };
  }
  function success(_id) {
    return { type: bundleConstants.DELETE_SUCCESS, _id };
  }
  function failure(_id, error) {
    return { type: bundleConstants.DELETE_FAILURE, _id, error };
  }
}
