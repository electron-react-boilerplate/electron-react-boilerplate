import GlobalStyle from './globalStyles';
import React from 'react';
import Theme from '../../assets/theme/main-theme';

export default function SnippetWindow() {
  return (
    <React.Suspense fallback={'Loading...'}>
      <Theme>
        <GlobalStyle />
        <h1>SNIPPET WINDOWS</h1>
      </Theme>
    </React.Suspense>
  );
}
