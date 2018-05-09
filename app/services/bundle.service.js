import { authHeader } from '../helpers';
import { dblDotLocalConfig } from '../constants/dblDotLocal.constants';

export const bundleService = {
  create,
  fetchAll,
  fetchById,
  update,
  requestSaveBundleTo,
  delete: removeBundle
};
export default bundleService;

const BUNDLE_API = 'bundle';
const BUNDLE_API_LIST = `${BUNDLE_API}/list`;
const BUNDLE_API_COUNT = `${BUNDLE_API}/count`;

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
      id: 'bundle02', name: 'Another Bundle', revision: 3, task: 'UPLOAD', status: 'UPLOADING', progress: 63, mode: 'PAUSED'
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
    let task = dbl.currentRevision === 0 ? 'UPLOAD' : 'DOWNLOAD';
    let status = dbl.currentRevision === 0 ? 'DRAFT' : 'COMPLETED';
    if (mode === 'store') {
      const { history } = store;
      const historyReversed = history.slice().reverse();
      const action = historyReversed.find((event) => event.type === 'updateStore');
      task = action.message.toUpperCase();
      status = 'COMPLETED';
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

const currentWindow = require('electron').remote.getCurrentWindow();
const downloadMgr = require('electron').remote.require('electron-dl');

function requestSaveBundleTo(bundleId) {
  const resourcePath = 'resource/metadata.xml';
  const url = `${dblDotLocalConfig.getHttpDblDotLocalBaseUrl()}/${BUNDLE_API}/${bundleId}/${resourcePath}`;
  return downloadMgr.download(currentWindow, url, { saveAs: true });
}

