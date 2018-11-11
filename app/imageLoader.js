/**
 * Some functions to load images off screen
 */
import { eachLimit, each } from 'async';

/**
 * An item containing a url to load
 * @typedef {Object} Item
 * @property {string} url - Image url.
 */

/**
 * Callback function for when image load succeeds
 *
 * @callback successCallback
 * @param {Image} img The loaded Image object
 * @param {Item} item The item associated with the image
 */

/**
 * Callback function for when image load errors
 *
 * @callback errorCallback
 * @param {Error} error The error thrown
 * @param {Item} item The item associated with the image
 */

/**
 * Loads a remote image off-page and returns the loaded Image object
 * @param {string} url Image src
 * @returns {Promise<Image>} A promise of a loaded image
 */
export const loadImageAsync = url =>
  new Promise((resolve, reject) => {
    const img = new Image();

    // Called when image loads
    img.onload = () => {
      resolve(img);
    };

    // Called when image fails
    img.onerror = error => {
      reject(error);
    };

    // Kicks off loading the image in the bbackground
    img.src = url;
  });

/**
 * Loads many remote images off-page and returns the loaded Image objects
 * @param {string[]} urls Image src's
 * @param {successCallback} successCallback Callback function for when image load succeeds
 * @param {errorCallback} errorCallback Callback function for when image load errors
 * @param {number} limit Concurrent limit to throttle requests. Zero is unlimited
 * @returns void
 */
export const loadImagesAsync = (items, successCallback, errorCallback, limit = 0) => {
  if (limit === 0) {
    each(items, (item, callback) => loadImagesHelper(item, callback, successCallback, errorCallback));
  } else {
    eachLimit(items, limit, (item, callback) => loadImagesHelper(item, callback, successCallback, errorCallback));
  }
};

/**
 * Helper function to work with async each and eachlimit
 * @param {string} item Image src
 * @param {*} callback async library callback
 * @param {successCallback} successCallback Callback function for when image load succeeds
 * @param {errorCallback} errorCallback Callback function for when image load errors
 * @returns void
 */
const loadImagesHelper = (item, callback, successCallback, errorCallback) => {
  const { url } = item;
  const promise = loadImageAsync(url);
  // eslint-disable-next-line promise/catch-or-return
  promise.then(
    result => {
      // eslint-disable-next-line promise/always-return
      if (successCallback) {
        successCallback(result, item);
      }

      callback();
    },
    error => {
      if (errorCallback) {
        errorCallback(error, item);
      }

      callback(error);
    },
  );
};
