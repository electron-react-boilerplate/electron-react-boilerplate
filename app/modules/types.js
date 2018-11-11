/**
 * A module gallery image object.
 *
 * @typedef ModuleGalleryImage
 * @type {object}
 * @property {string | number} id - Id of image. Used to drill down.
 * @property {string | string[]} image - Url of image. Array will be used as fallbacks if the first one fails.
 * @property {string | string[]} thumb - Url of smaller version of the image. Array will be used as fallbacks if the first one fails.
 * @property {string} title - Descrition of image.
 * @property {boolean} hasChildren - Flag to indicate that this gallery contains children and can be drilled down further.
 */

/**
 * A gallery object.
 *
 * @typedef ModuleGallery
 * @type {object}
 * @property {string[]} items - Resulting list of ModuleGalleryImage objects.
 * @property {boolean} hasNextPage - Flag to indicate that this gallery has more pages.
 */

/**
 * Interface for a module for browsing galleries and images.
 *
 * @constructor
 */
export function Module() {} // eslint-disable-line import/prefer-default-export

/**
 * Retrieves top level gallery images
 *
 * @abstract
 * @param {number} [pageNumber] - Page to retrieve. Default is one.
 * @returns {Promise<Array<ModuleGallery>>} An array of gallery image objects.
 */
Module.prototype.getGalleriesAsync = (pageNumber = 1) => {
  throw new Error('not implemented', pageNumber);
};

/**
 * Retrieves top level gallery images
 *
 * @abstract
 * @param {string} searchQuery - Search Query text (should already be url encoded).
 * @param {number} [pageNumber] - Page to retrieve. Default is one.
 * @returns {Promise<Array<ModuleGallery>>} An array of gallery image objects.
 */
Module.prototype.searchGalleriesAsync = (searchQuery, pageNumber = 1) => {
  throw new Error('not implemented', searchQuery, pageNumber);
};

/**
 * Retrieves child images for a galelry given the galelry Id. Does not support paging.
 *
 * @abstract
 * @param {string | number} galleryId - Id of the Gallery
 * @param {number} [pageNumber] - Page to retrieve. Default is one.
 * @returns {Promise<Array<ModuleGallery>>} An array of gallery image objects.
 */
Module.prototype.getGalleryAsync = (galleryId, pageNumber = 1) => {
  throw new Error('not implemented', galleryId, pageNumber);
};
