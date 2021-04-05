import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('root'));

window.electron.ipcRenderer.once('ipc-example', (arg: string) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});

window.electron.ipcRenderer.send('ipc-example', 'ping');
