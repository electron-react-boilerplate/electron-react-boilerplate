import GlobalStyle from './globalStyles';
import React from 'react';
import Theme from '../../assets/theme/main-theme';
import MainContent from './main-content';
import Sidebar from './sidebar/sidebar';
import NavBar from './navbar';
import * as S from './App.styled';

export default function App(snippetWindow?: any) {
  return (
    <React.Suspense fallback={'Loading...'}>
      <Theme>
        <GlobalStyle />
        {snippetWindow?.snippetWindow ? (
          <h1>SNIPPET WINDOWS</h1>
        ) : (
          <S.AppContainer>
            <NavBar />
            <S.Content>
              <Sidebar />
              <MainContent />
            </S.Content>
          </S.AppContainer>
        )}
      </Theme>
    </React.Suspense>
  );
}
