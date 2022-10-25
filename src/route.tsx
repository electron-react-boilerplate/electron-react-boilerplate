import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './renderer/pages/home/Home';
import Scan from './renderer/pages/scan/Scan';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
      </Routes>
    </Router>
  );
}
