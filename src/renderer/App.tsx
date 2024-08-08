import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Background from './components/Background/Background';
import Navbar from './components/Navbar/Navbar';
import Head from './components/Head/Head';

function Main() {
  return (
    <div>
      <Navbar />
      <Head />
      <Background />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
