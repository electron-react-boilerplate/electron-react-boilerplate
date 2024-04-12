import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { Operations } from 'types/part';
import { editApp } from 'state/app/appSlice';
import { initialState } from 'state/operations/operationsSlice';

import Layout from 'components/Layout';
// Pages
import WorkGroup from 'pages/WorkGroup';
import Operation from 'pages/Operation';
import Preview from 'pages/Preview';

import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const lastSavedFileState = useSelector(
    (state: { app: { lastSavedFileState: string } }) =>
      state.app.lastSavedFileState,
  );
  const operations = useSelector(
    (state: { operations: Operations }) => state.operations,
  );

  useEffect(() => {
    if (lastSavedFileState && lastSavedFileState !== JSON.stringify(operations))
      dispatch(editApp({ isSaved: false }));
    else if (
      !lastSavedFileState &&
      JSON.stringify(operations) !== JSON.stringify(initialState)
    )
      dispatch(editApp({ isSaved: false }));
    else dispatch(editApp({ isSaved: true }));
  }, [dispatch, lastSavedFileState, operations]);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/workgroup" element={<WorkGroup />} />
          <Route path="/operation" element={<Operation />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
