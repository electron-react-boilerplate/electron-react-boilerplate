import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// The preload exposes one typed operation instead of generic IPC channels.
void window.electron?.ping('ping').then(console.log).catch(console.error);
