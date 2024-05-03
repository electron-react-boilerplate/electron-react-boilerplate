import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { Part } from 'types/part';
import { editApp } from 'state/app/appSlice';
import { initialState } from 'state/part/partSlice';

import Layout from 'components/Layout';
// Pages
import WorkGroup from 'pages/WorkGroup';
import Contour from 'pages/Contour';
import Preview from 'pages/Preview';
import OffPage from 'pages/OffPage';

import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const lastSavedFileState = useSelector(
    (state: { app: { lastSavedFileState: string } }) =>
      state.app.lastSavedFileState,
  );
  const part = useSelector((state: { part: Part }) => state.part);

  useEffect(() => {
    if (lastSavedFileState && lastSavedFileState !== JSON.stringify(part))
      dispatch(editApp({ isSaved: false }));
    else if (
      !lastSavedFileState &&
      JSON.stringify(part) !== JSON.stringify(initialState)
    )
      dispatch(editApp({ isSaved: false }));
    else dispatch(editApp({ isSaved: true }));
  }, [dispatch, lastSavedFileState, part]);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<OffPage />} />
          <Route path="/workgroup" element={<WorkGroup />} />
          <Route path="/contour/:id" element={<Contour />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
