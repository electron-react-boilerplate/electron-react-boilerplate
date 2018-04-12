import { authHeader } from '../helpers';

const storage = window.require('electron-json-storage');

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: remove
};
export default userService;

const KEY_STORAGE_USER = 'user';

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `email=${username}&password=${password}`
  };

  return fetch('https://api.thedigitalbiblelibrary.org/auth/login', requestOptions)
    .then(response => response.json())
    .then(json => {
      // login successful if there's a jwt token in the response
      if (json && json.auth_token) {
        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        const newUserObj = JSON.parse(JSON.stringify(json));
        newUserObj.username = username;
        const userData = JSON.stringify(newUserObj);
        localStorage.setItem(KEY_STORAGE_USER, userData);
        storage.set(KEY_STORAGE_USER, userData);
        return userData;
      }
      const errorMsg = `Error (${json.error_code} ${json.status_code}): ${json.message}`;
      return Promise.reject(errorMsg);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem(KEY_STORAGE_USER);
  storage.remove(KEY_STORAGE_USER);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch('/users/register', requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
