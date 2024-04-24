import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { Hello } from '~/Hello/Hello';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
