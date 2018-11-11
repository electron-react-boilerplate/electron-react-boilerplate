import qs from 'qs';

/**
 * Options for generating a lorum-picsum image
 * @typedef {Object} LoremPicsumOptions
 * @property {number} width - Width of image.
 * @property {number} height - Height of image.
 * @property {boolean} [forceInsecure] - Uses http for the url scheme.
 * @property {boolean} [random] - Get a random image.
 * @property {boolean} [grayscale] - Greyscales the image.
 * @property {(string|number)} [specificImage] - Get a specific image.
 * @property {boolean} [blur] - Get a blurred image.
 * @property {string} [croppingGravity] - Select the cropping gravity. Valid options are: north, east, south, west, center.
 */

/**
 * Get a placeholder image. Docs: https://picsum.photos/

 * @param {LoremPicsumOptions} [options] - Options for generating the url.
 * @returns {string} - Url of image.
 */
export default function loremPicsum(options = { width: 100, height: 100 }) {
  const { width, height, random, grayscale, specificImage, blur, croppingGravity, forceInsecure } = options;

  const domain = 'picsum.photos';
  const queryStringObject = {};
  const schema = forceInsecure ? 'http' : 'https';
  let path = `${width}/${height}`;

  if (random) {
    queryStringObject.random = null;
  }

  if (blur) {
    queryStringObject.blur = null;
  }

  if (grayscale) {
    path = `g/${path}`;
  }

  if (specificImage) {
    queryStringObject.image = specificImage;
  }

  if (croppingGravity) {
    queryStringObject.gravity = croppingGravity;
  }

  return `${schema}://${domain}/${path}?${qs.stringify(queryStringObject)}`;
}
