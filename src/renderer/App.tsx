import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from 'ui';
import { views } from 'views';
import './App.css';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {views.map(([path, element]) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}
