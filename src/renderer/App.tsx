import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './App.css';

import SerialDisplay from './SerialPort';

const Hello = () => {
  return <div />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SerialDisplay />} />
      </Routes>
    </Router>
  );
}
