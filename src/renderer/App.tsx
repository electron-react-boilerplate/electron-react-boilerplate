import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { Contours } from 'types/part';
import { editApp } from 'state/app/appSlice';
import { initialState } from 'state/part/partSlice';

import Layout from 'components/Layout';
// Pages
import WorkGroup from 'pages/WorkGroup';
import Contour from 'pages/Contour';
import Preview from 'pages/Preview';

import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const lastSavedFileState = useSelector(
    (state: { app: { lastSavedFileState: string } }) =>
      state.app.lastSavedFileState,
  );
  const contours = useSelector(
    (state: { contours: Contours }) => state.contours,
  );

  useEffect(() => {
    if (lastSavedFileState && lastSavedFileState !== JSON.stringify(contours))
      dispatch(editApp({ isSaved: false }));
    else if (
      !lastSavedFileState &&
      JSON.stringify(contours) !== JSON.stringify(initialState)
    )
      dispatch(editApp({ isSaved: false }));
    else dispatch(editApp({ isSaved: true }));
  }, [dispatch, lastSavedFileState, contours]);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/workgroup" element={<WorkGroup />} />
          <Route path="/contour" element={<Contour />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
