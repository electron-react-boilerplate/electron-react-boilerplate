import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from '../../../../libs/ui/dist/components';
import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>Die Macht Zentrale</h1>
      <div className="Hello">
        <Button variant="primary" onClick={() => window.open('https://electron-react-boilerplate.js.org/', '_blank')}>
          <span role="img" aria-label="books">
            📚
          </span>
          Read our docs
        </Button>
        <Button variant="secondary" onClick={() => window.open('https://github.com/sponsors/electron-react-boilerplate', '_blank')}>
          <span role="img" aria-label="folded hands">
            🙏
          </span>
          Donate
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
