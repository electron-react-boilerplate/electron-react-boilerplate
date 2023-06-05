import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ActiveAppList from './components/ActiveAppList';
import './App.css';

function Hello() {
  return (
    <div>
      <ActiveAppList />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
