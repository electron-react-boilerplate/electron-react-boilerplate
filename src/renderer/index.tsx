import { createRoot } from 'react-dom/client';
import { Home } from './pages/home/Home';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Home />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
