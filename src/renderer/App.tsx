import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './App.css';

import SerialDisplay from './SerialPort';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SerialDisplay />} />
      </Routes>
    </Router>
  );
}
