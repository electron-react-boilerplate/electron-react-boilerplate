import sort from 'fast-sort';
import traverse from 'traverse';
import { bundleConstants } from '../constants/bundle.constants';
import { bundleService } from '../services/bundle.service';

export const bundleActions = {
  mockFetchAll,
  fetchAll,
  delete: removeBundle,
  downloadResources,
  requestSaveBundleTo,
  toggleModePauseResume,
  toggleSelectBundle
};

export default bundleActions;

export function mockFetchAll() {
  return dispatch => {
    dispatch(request());
    return new Promise(resolve => {
      const mockBundles = getMockBundles();
      resolve(mockBundles);
    }).then(bundles => dispatch(success(bundles)), error => dispatch(failure(error)));
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

export function fetchAll() {
  return dispatch => {
    dispatch(request());

    return bundleService
      .fetchAll()
      .then(bundles => dispatch(success(bundles)), error => dispatch(failure(error)));
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

export function downloadResources(id) {
  return async dispatch => {
    try {
      const manifestResourcePaths = await bundleService.getManifestResourcePaths(id);
      manifestResourcePaths.unshift('metadata.xml');
      await bundleService.downloadResources(id);
      dispatch(request(id, manifestResourcePaths));
    } catch (error) {
      dispatch(failure(id, error));
    }
  };
  function request(_id, manifestResourcePaths) {
    return { type: bundleConstants.DOWNLOAD_RESOURCES_REQUEST, id: _id, manifestResourcePaths };
  }
  function failure(_id, error) {
    return { type: bundleConstants.DOWNLOAD_RESOURCES_FAILURE, id, error };
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

export function requestSaveBundleTo(id, selectedFolder) {
  return async dispatch => {
    const bundleInfo = await bundleService.fetchById(id);
    const bundleBytesToSave = traverse(bundleInfo.store.file_info).reduce(addByteSize, 0);
    const resourcePaths = await bundleService.getResourcePaths(id);
    resourcePaths.unshift('metadata.xml');
    const resourcePathsProgress = resourcePaths.reduce((acc, resourcePath) => {
      acc[resourcePath] = 0;
      return acc;
    }, {});
    let bundleBytesSaved = 0;
    dispatch(request(id, selectedFolder, bundleBytesToSave, resourcePaths));
    resourcePaths.forEach(async resourcePath => {
      try {
        const downloadItem = await bundleService.requestSaveResourceTo(
          selectedFolder,
          id,
          resourcePath,
          (resourceTotalBytesSaved, resourceProgress) => {
            const originalResourceBytesTransferred = resourcePathsProgress[resourcePath];
            resourcePathsProgress[resourcePath] = resourceTotalBytesSaved;
            const bytesDiff = resourceTotalBytesSaved - originalResourceBytesTransferred;
            bundleBytesSaved += bytesDiff;
            if (resourceProgress && resourceProgress % 100 === 0) {
              dispatch(updated(
                id,
                resourcePath,
                resourceTotalBytesSaved,
                bundleBytesSaved,
                bundleBytesToSave
              ));
            }
          }
        );
        return downloadItem;
      } catch (error) {
        dispatch(failure(id, error));
      }
    });
  };

  function addByteSize(accBytes, fileInfoNode) {
    if (fileInfoNode.is_dir || this.isRoot || fileInfoNode.size === undefined) {
      return accBytes;
    }
    return accBytes + fileInfoNode.size;
  }

  function request(_id, _folderName, bundleBytesToSave, resourcePaths) {
    return {
      type: bundleConstants.SAVETO_REQUEST,
      id: _id,
      folderName: _folderName,
      bundleBytesToSave,
      resourcePaths
    };
  }

  function updated(
    _id,
    resourcePath,
    resourceTotalBytesSaved,
    bundleBytesSaved,
    bundleBytesToSave
  ) {
    return {
      type: bundleConstants.SAVETO_UPDATED,
      id,
      resourcePath,
      resourceTotalBytesSaved,
      bundleBytesSaved,
      bundleBytesToSave
    };
  }
  function failure(_id, error) {
    return { type: bundleConstants.SAVETO_FAILURE, id: _id, error };
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
      id: 'bundle01',
      name: 'Test Bundle #1',
      revision: 3,
      task: 'UPLOAD',
      status: 'COMPLETED'
    },
    {
      id: 'bundle02',
      name: 'Another Bundle',
      revision: 3,
      task: 'UPLOAD',
      status: 'IN_PROGRESS',
      progress: 63,
      mode: 'PAUSED'
    },
    {
      id: 'bundle03',
      name: 'Audio Bundle',
      revision: 52,
      task: 'DOWNLOAD',
      status: 'IN_PROGRESS',
      progress: 12,
      mode: 'RUNNING'
    },
    {
      id: 'bundle04',
      name: 'Unfinished Bundle',
      task: 'UPLOAD',
      status: 'DRAFT'
    },
    {
      id: 'bundle05',
      name: 'Unfinished Video Bundle',
      task: 'UPLOAD',
      status: 'DRAFT'
    },
    {
      id: 'bundle06',
      name: 'DBL Bundle',
      task: 'DOWNLOAD',
      status: 'NOT_STARTED'
    },
    {
      id: 'bundle07',
      name: 'DBL Bundle 3',
      task: 'DOWNLOAD',
      status: 'NOT_STARTED'
    },
    {
      id: 'bundle08',
      name: 'Audio Bundle #2',
      revision: 40,
      task: 'DOWNLOAD',
      status: 'COMPLETED'
    },
    {
      id: 'bundle09',
      name: 'Audio Bundle #3',
      revision: 5,
      task: 'SAVETO',
      status: 'IN_PROGRESS',
      progress: 0,
    },
    {
      id: 'bundle10',
      name: 'Audio Bundle #4',
      revision: 4,
      task: 'SAVETO',
      status: 'IN_PROGRESS',
      progress: 66,
    },
    {
      id: 'bundle11',
      name: 'Audio Bundle #5',
      revision: 5,
      task: 'SAVETO',
      status: 'COMPLETED',
      progress: 100,
    }
  ];
  const taskOrder = ['UPLOAD', 'DOWNLOAD', 'SAVETO'];
  const statusOrder = ['IN_PROGRESS', 'DRAFT', 'COMPLETED', 'NOT_STARTED'];
  const sortedBundles = sort(bundles).asc([
    b => statusOrder.indexOf(b.status),
    b => taskOrder.indexOf(b.task),
    b => b.name
  ]);
  return sortedBundles;
}
