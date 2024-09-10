import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Calls from './pages/Calls/Calls';
import News from './pages/News/News';
import Schedule from './pages/Schedule/Schedule';
import Background from './components/Background/Background';
import Navbar from './components/Navbar/Navbar';
import Head from './components/Head/Head';
import View from './pages/View/View';

export default function App() {
  document.addEventListener("keydown", (event) => 
    {
      if (event.key.toLowerCase() == 'r') 
      {
        window.location.reload();
      }
    }
  );

  return (
    <div>
      <Router>
        <Background />
        <Navbar />
        <Head />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calls" element={<Calls />} />
          <Route path="/news" element={<News />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Router>
    </div>
  );
}
