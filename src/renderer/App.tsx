import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IndexPage from './pages/index';
import './App.css';

export default function App() {
  return (
    <Router>
      <Link to="/">房贷计算器</Link>
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </Router>
  );
}
