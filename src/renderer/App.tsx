import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Profiles from './pages/Profiles';
import Proxies from './pages/Proxies';
import './App.css';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Here we load in all of the page components */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/proxies" element={<Proxies />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
