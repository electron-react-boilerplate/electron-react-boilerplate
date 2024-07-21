import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icons/icon.svg';
import NavBar from './components/NavBar'; // Adjust the import path as needed
import Dashboard from './pages/Dashboard'; // Import your page components
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Profiles from './pages/Profiles';
import Proxies from './pages/Proxies';
import './App.css';
// import 'your-project-name\assets\fonts\fonts.css';

function Hello() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <div className="Hello">
          <img width="200" alt="icon" src={icon} />
        </div>
        <h1>electron-react-boilerplate</h1>
        <div className="Hello">
          <a
            href="https://electron-react-boilerplate.js.org/"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button">
              <span role="img" aria-label="books">
                📚
              </span>
              Read our docs
            </button>
          </a>
          <a
            href="https://github.com/sponsors/electron-react-boilerplate"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button">
              <span role="img" aria-label="folded hands">
                🙏
              </span>
              Donate
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/proxies" element={<Proxies />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
