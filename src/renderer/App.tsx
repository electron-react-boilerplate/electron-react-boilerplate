import React, { useEffect } from 'react';
import styled from 'styled-components';

import CircularProgress from '@mui/material/CircularProgress';

import './App.css';
import GlobalTheme from '../global/GlobalTheme';
import GlobalTypography from '../global/GlobalTypography';
import useGlobalState from '../global/GlobalSate';

import AuthScreen from '../screens/Auth';
import SearchScreen from '../screens/Search';
import CommandScreen from '../screens/Command';
import ClipboardCopyScreen from '../screens/ClipboardCopy';
import NewUserScreen from '../screens/NewUser';

// TODO: COMMENTED OUT FOR DEVELOPMENT IN BROWSER
// TODO: FIND WAY TO DETECT IF IN BROWSER OR IN ELECTRON
// const { ipcRenderer } = require('electron');

const StyledApp = styled.div`
  background-color: var(--color-secondary);

  .global_loading {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function App() {
  const { setCurrentScreen, currentScreen, globalLoading, setGlobalLoading } =
    useGlobalState();

  // AUTO NAVIGATE USER BASED ON AUTH
  useEffect(() => {
    setCurrentScreen('SEARCH_SCREEN');
    // setGlobalLoading(true);
    // const autoNavigateUserBasedOnAuth = async () => {
    //   try {
    //     await Auth.currentAuthenticatedUser();
    //     if (currentScreen === "AUTH_SCREEN") {
    //       setCurrentScreen("SEARCH_SCREEN");
    //     }
    //     setTimeout(() => {
    //       setGlobalLoading(false);
    //     }, 1500);
    //   } catch (err) {
    //     if (
    //       currentScreen !== "AUTH_SCREEN" &&
    //       currentScreen !== "NEW_USER_SCREEN"
    //     ) {
    //       setCurrentScreen("AUTH_SCREEN");
    //     }
    //     setTimeout(() => {
    //       setGlobalLoading(false);
    //     }, 1500);
    //   }
    // };

    // autoNavigateUserBasedOnAuth().finally(() => {
    //   console.log("autoNavigateUserBasedOnAuth finished");
    // });
  }, []);

  return (
    <GlobalTheme>
      <GlobalTypography>
        <StyledApp
          className="App"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              // ipcRenderer.send('close-me-please');
            }
          }}
        >
          <header className="App-header">
            {globalLoading && (
              <div className="global_loading">
                <CircularProgress />
              </div>
            )}
            {currentScreen === 'AUTH_SCREEN' && !globalLoading && (
              <AuthScreen setCurrentScreen={setCurrentScreen} />
            )}
            {currentScreen === 'NEW_USER_SCREEN' && !globalLoading && (
              <NewUserScreen />
            )}
            {currentScreen === 'SEARCH_SCREEN' && !globalLoading && (
              <SearchScreen setCurrentScreen={setCurrentScreen} />
            )}
            {currentScreen === 'COMMAND_SCREEN' && !globalLoading && (
              <CommandScreen setCurrentScreen={setCurrentScreen} />
            )}
            {currentScreen === 'CLIPBOARD_COPY_SCREEN' && !globalLoading && (
              <ClipboardCopyScreen setCurrentScreen={setCurrentScreen} />
            )}
          </header>
        </StyledApp>
      </GlobalTypography>
    </GlobalTheme>
  );
}

export default App;
