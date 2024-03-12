import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import Diam from 'pages/Diam';
import WorkGroup from 'pages/WorkGroup';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/workgroup" element={<WorkGroup />} />
          <Route path="/diam" element={<Diam />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
