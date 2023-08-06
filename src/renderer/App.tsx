import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { BaseLayout } from './layout/BaseLayout';
import { Navbar } from './components/Navbar';
import { ItemList } from './components/ItemList';

const MainPage = () => {
  return (
    <BaseLayout>
      <Navbar />
      <ItemList />
    </BaseLayout>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
