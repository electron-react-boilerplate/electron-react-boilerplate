import path from 'path';
import { authHeader } from '../helpers';
import { dblDotLocalConfig } from '../constants/dblDotLocal.constants';
import download from './download-with-fetch.flow';

export const bundleService = {
  create,
  fetchAll,
  fetchById,
  update,
  getResourcePaths,
  requestSaveResourceTo,
  delete: removeBundle
};
export default bundleService;

const BUNDLE_API = 'bundle';
const BUNDLE_API_LIST = `${BUNDLE_API}/list`;
const BUNDLE_API_COUNT = `${BUNDLE_API}/count`;
const RESOURCE_API = 'resource';
const RESOURCE_API_LIST = RESOURCE_API;
/*
{
  "099a30a6-b707-4df8-b4dd-7149f25658b7": {
    "local_id": "099a30a6-b707-4df8-b4dd-7149f25658b7",
    "mode": "store",
    "dbl": {
      "id": "65885538a6d64ec8",
      "currentRevision": "0",
      "medium": "text"
    },
    "store": {
      "created": "2018-05-04 11:02:14",
      "modified": "2018-05-04 11:02:14",
      "history": [
        {
          "type": "initialize",
          "timestamp": "2018-05-04 11:02:14",
          "message": ""
        },
        {
          "type": "writeMetadata",
          "timestamp": "2018-05-04 11:02:14",
          "message": "metadata.xml"
        }
      ],
      "tasks": [],
      "labels": {},
      "file_info": {
        "metadata.xml": {
          "is_dir": false,
          "size": 1224,
          "modified": "2018-05-04 11:02:14"
        }
      }
    },
    "download": null,
    "metadata": {
      "name": "Empty Text Bundle",
      "abbreviation": "<none>",
      "language": "<none>",
      "dateUpdated": "2018-05-04 11:02:14"
    }
  },

  TO this format:
   {
      id: 'bundle02', name: 'Another Bundle', revision: 3, task: 'UPLOAD', status: 'IN_PROGRESS', progress: 63, mode: 'PAUSED'
   },
 */
function fetchAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${dblDotLocalConfig.getHttpDblDotLocalBaseUrl()}/${BUNDLE_API_LIST}`, requestOptions)
    .then(handleResponse).then(convertBundleApiListToBundles);
}

function convertBundleApiListToBundles(apiBundles) {
  const bundles = Object.keys(apiBundles).map((bundleId) => {
    const apiBundle = apiBundles[bundleId];
    const {
      mode, metadata, dbl, store
    } = apiBundle;
    let task = dbl.currentRevision === '0' ? 'UPLOAD' : 'DOWNLOAD';
    let status = dbl.currentRevision === '0' ? 'DRAFT' : 'NOT_STARTED';
    if (mode === 'store') {
      const { history } = store;
      const historyReversed = history.slice().reverse();
      const eventUpdateStore = historyReversed.find((event) => event.type === 'updateStore');
      if (eventUpdateStore && eventUpdateStore.message && eventUpdateStore.message === 'download') {
        task = eventUpdateStore.message.toUpperCase();
        const indexOfUpdateStoreDownload = historyReversed.indexOf(eventUpdateStore);
        const indexOfDownloadResources = historyReversed.findIndex((event) => event.type === 'executeTask' && event.message === 'downloadResources');
        if (indexOfUpdateStoreDownload < indexOfDownloadResources) {
          status = 'COMPLETED';
        }
      }
    }
    return {
      id: bundleId,
      name: metadata.name,
      revision: dbl.currentRevision,
      task,
      status,
    };
  });
  return bundles;
}


function fetchById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${dblDotLocalConfig.getHttpDblDotLocalBaseUrl()}/${BUNDLE_API}/${id}`, requestOptions)
    .then(handleResponse);
}

function create(bundle) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bundle)
  };

  return fetch(`${dblDotLocalConfig.getHttpDblDotLocalBaseUrl()}/${BUNDLE_API}/create`, requestOptions)
    .then(handleResponse);
}

function update(bundle) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(bundle)
  };

  return fetch(`/${BUNDLE_API}/${bundle.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function removeBundle(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`/${BUNDLE_API}/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}

function getResourcePaths(bundleId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  const url = `${dblDotLocalConfig.getHttpDblDotLocalBaseUrl()}/${BUNDLE_API}/${bundleId}/${RESOURCE_API_LIST}`;
  return fetch(url, requestOptions)
    .then(handleResponse);
}

/*
 * Downloader.download('https://download.damieng.com/fonts/original/EnvyCodeR-PR7.zip',
 *  'envy-code-r.zip', (bytes, percent) => console.log(`Downloaded ${bytes} (${percent})`));
 */
function requestSaveResourceTo(selectedFolder, bundleId, resourcePath, progressCallback) {
  const url = `${dblDotLocalConfig.getHttpDblDotLocalBaseUrl()}/${BUNDLE_API}/${bundleId}/${RESOURCE_API}/${resourcePath}`;
  const targetPath = path.join(selectedFolder, resourcePath);
  return download(url, targetPath, progressCallback);
}
