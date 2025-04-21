import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import './App.css';

function MainApp() {
  return (
    <div>
      <TaskList/>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}
