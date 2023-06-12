import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GlobalStyle from './globalStyles';
import React, { lazy } from 'react';
import SnippetsPage from './pages/snippets';
import AutoCompletes from './pages/autocompletes';
import Theme from '../../assets/theme/main-theme';

const AutoComplete = lazy(() => import('./pages/autocompletes'));

export default function App() {
  return (
    <React.Suspense fallback={'Loading...'}>
      <Theme>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<SnippetsPage />} />
            <Route path="/autocompletes" element={<AutoCompletes />} />
          </Routes>
        </Router>
      </Theme>
    </React.Suspense>
  );
}
