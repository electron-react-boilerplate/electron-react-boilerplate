import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Calls from './pages/Calls/Calls';
import News from './pages/News/News';
import Background from './components/Background/Background';
import Navbar from './components/Navbar/Navbar';
import Head from './components/Head/Head';

export default function App() {
  return (
    <div>
      <Router>
        <Background />
        <Navbar />
        <Head />
        <Routes>
          <Route path="schedule/" element={<Home />} />
          <Route path="schedule/calls" element={<Calls />} />
          <Route path="schedule/news" element={<News />} />
        </Routes>
      </Router>
    </div>
  );
}
