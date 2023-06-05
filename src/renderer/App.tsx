import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ActiveAppList from './components/ActiveAppList';
import AppListContext from './contexts/AppListContext';
import './App.css';

const listOfApps = { list: ['Hello', 'moi'] };

export default function App() {
  return (
    <AppListContext.Provider value={listOfApps}>
      <Router>
        <Routes>
          <Route path="/" element={<ActiveAppList />} />
        </Routes>
      </Router>
    </AppListContext.Provider>
  );
}
