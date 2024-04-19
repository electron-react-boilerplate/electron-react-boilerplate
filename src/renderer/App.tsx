import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function HomePage() {
  return (
    <div>
      <h1>Hola mundo</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
