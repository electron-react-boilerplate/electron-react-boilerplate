import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { Part } from 'types/part';
import { editApp } from 'state/app/appSlice';
import { initialState } from 'state/part/partSlice';

import Layout from 'components/Layout';
import ModalCloseApp from 'components/ModalCloseApp';

// Pages
import WorkGroup from 'pages/WorkGroup';
import Contour from 'pages/Contour';
import OffPage from 'pages/OffPage';

import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const lastSavedFileState = useSelector(
    (state: { app: { lastSavedFileState: string } }) =>
      state.app.lastSavedFileState,
  );
  const part = useSelector((state: { part: Part }) => state.part);

  const [isConfirmCloseModalOpen, setIsConfirmCloseModalOpen] = useState(false);
  const [isAttemptingToClose, setIsAttemptingToClose] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isAttemptingToClose) {
        event.preventDefault();
        event.returnValue = '';
        setIsConfirmCloseModalOpen(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAttemptingToClose]);

  const handleConfirmClose = () => {
    setIsAttemptingToClose(true);
    setIsConfirmCloseModalOpen(false);
    window.removeEventListener('beforeunload', () => {});
    window.close();
  };

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
        <>
          <Routes>
            <Route path="/" element={<OffPage />} />
            <Route path="/workgroup" element={<WorkGroup />} />
            <Route path="/contour/:id" element={<Contour />} />
          </Routes>
          <ModalCloseApp
            isOpen={isConfirmCloseModalOpen}
            onClose={() => setIsConfirmCloseModalOpen(false)}
            onConfirm={handleConfirmClose}
          />
        </>
      </Layout>
    </Router>
  );
};

export default App;
