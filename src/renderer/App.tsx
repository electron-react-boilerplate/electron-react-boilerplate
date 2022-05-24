import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Screen from '../containers/Screen'
import Forms from '../containers/Forms'
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Screen />} />
      </Routes>
      <Routes>
        <Route path="/forms" element={<Forms />} />
      </Routes>
    </Router>
  );
}
