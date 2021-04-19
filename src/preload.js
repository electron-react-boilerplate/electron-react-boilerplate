const { contextBridge, ipcRenderer } = require('electron');

// Name of channels that renderer can be listened.
const responseChannels = new Set(['update-counter']);

const activeListeners = new Map();

/**
 * Denotes whether or not the renderer can access the channel.
 * @param {string} channel Current channel it is strying to access.
 * @param {Set<string>} check A set or map in which channel should be compared against.
 */
const isValidChannel = (channel) => {
  if (
    typeof channel !== 'string' ||
    !responseChannels.has(channel) ||
    activeListeners.has(channel)
  ) {
    return false;
  }
  return true;
};

/**
 * API used for development environment.
 */
contextBridge.exposeInMainWorld('dev', {
  isRunning: process.env.NODE_ENV === 'development',
  port: process.env.PORT,
});

/**
 * API used for communicating with main process.
 */
contextBridge.exposeInMainWorld('api', {
  // Start of example API
  incrementNumber: (val) => {
    if (typeof val !== 'number') {
      throw Error('Failed validation for incrementNumber');
    }
    ipcRenderer.send('do-increment', val);
  },
  decrementNumber: (val) => {
    if (typeof val !== 'number') {
      throw Error('Failed validation for decrementNumber');
    }
    ipcRenderer.send('do-decrement', val);
  },
  // End of example API
  // https://github.com/electron/electron/issues/21437
  onResponse: (channel, fn) => {
    if (isValidChannel(channel)) {
      const saferFn = (event, ...args) => fn(...args);
      activeListeners.set(channel, saferFn);
      ipcRenderer.on(channel, saferFn);
    } else {
      throw Error('Failed validation for onResponse');
    }
  },
  removeResponseChannel: (channel) => {
    if (activeListeners.has(channel)) {
      const saferFn = activeListeners.get(channel);
      ipcRenderer.removeListener(channel, saferFn);
      activeListeners.delete(channel);
    }
  },
});
