import React, { lazy } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import SnippetsPage from '../pages/snippets/snippets';
import Contact from 'renderer/pages/contact/contact';

const AutoCompletes = lazy(
  () => import('../pages/autocompletes/autocompletes')
);

const MainContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SnippetsPage />} />
        <Route path="/autocompletes" element={<AutoCompletes />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default MainContent;
