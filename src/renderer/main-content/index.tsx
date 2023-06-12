import React, { lazy } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import SnippetsPage from '../pages/snippets/snippets';

const AutoCompletes = lazy(
  () => import('../pages/autocompletes/autocompletes')
);

const MainContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SnippetsPage />} />
        <Route path="/autocompletes" element={<AutoCompletes />} />
      </Routes>
    </Router>
  );
};

export default MainContent;
