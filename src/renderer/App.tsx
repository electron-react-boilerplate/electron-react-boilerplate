import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';

// Pages
import WorkGroup from 'pages/WorkGroup';
import Operation from 'pages/Operation';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/workgroup" element={<WorkGroup />} />
          <Route path="/operation" element={<Operation />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
