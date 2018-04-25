import { authHeader } from '../helpers';
import { dblDotLocalConfig } from '../constants/dblDotLocal.constants';

export const bundleService = {
  create,
  fetchAll,
  fetchById,
  update,
  delete: removeBundle
};
export default bundleService;

function fetchAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${dblDotLocalConfig.getHttpDblDotLocalBaseUrl()}/bundles`, requestOptions)
    .then(handleResponse);
}

function fetchById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${dblDotLocalConfig.getHttpDblDotLocalBaseUrl()}/bundles/${id}`, requestOptions)
    .then(handleResponse);
}

function create(bundle) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bundle)
  };

  return fetch(`${dblDotLocalConfig.getHttpDblDotLocalBaseUrl()}/bundles/create`, requestOptions)
    .then(handleResponse);
}

function update(bundle) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(bundle)
  };

  return fetch(`/bundles/${bundle.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function removeBundle(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`/bundles/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
