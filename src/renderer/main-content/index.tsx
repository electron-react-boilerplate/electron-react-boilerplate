import React, { lazy } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import SnippetsPage from '../pages/snippets/snippets';
import { useAtom } from 'jotai';
import { tabSelectedAtom } from 'atoms/atoms';

const AutoCompletes = lazy(
  () => import('../pages/autocompletes/autocompletes')
);
const Contact = lazy(() => import('../pages/contact/contact'));

const MainContent: React.FC = () => {
  const [tab] = useAtom(tabSelectedAtom);
  let Content = <></>;
  switch (tab) {
    case 'autocompletes':
      Content = <AutoCompletes />;
      break;
    case 'contact':
      Content = <Contact />;
      break;
    default:
      Content = <SnippetsPage />;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={Content} />
      </Routes>
    </Router>
  );
};

export default MainContent;
