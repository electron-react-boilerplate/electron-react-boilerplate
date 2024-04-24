import { createRoot } from 'react-dom/client';
import App from './App/App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  // console.log(arg);
  console.log("window.electron.ipcRenderer.once('ipc-example' =", arg);
});
console.log("window.electron.ipcRenderer.sendMessage('ipc-example', ['ping'])");
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

window.electron.ipcRenderer.on('ipc-msg', (arg) => {
  console.log("window.electron.ipcRenderer.on('ipc-msg' =", arg);
});
console.log("window.electron.ipcRenderer.sendMessage('ipc-msg', ['msg12345'])");
window.electron.ipcRenderer.sendMessage('ipc-msg', ['msg12345']);
