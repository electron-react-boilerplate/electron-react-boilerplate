/**
 * Dumb cache
 */
export default class Cache {
  constructor() {
    this.innerCache = {};
  }

  clear(key) {
    if (this.has(key)) {
      delete this.innerCache[key];
    }
  }

  clearAll() {
    const keys = Object.keys(this.innerCache);
    for (let i = 0; i < keys.length; i += 1) {
      delete this.innerCache[keys[i]];
    }
  }

  get(key) {
    if (this.has(key)) {
      return this.innerCache[key];
    }

    return undefined;
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this.innerCache, key);
  }

  set(key, value) {
    this.innerCache[key] = value;
  }
}
