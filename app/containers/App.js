import * as React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import GlobalStyle from '../global-styles';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

const AppWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

export default class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <GlobalStyle />
        <CssBaseline />
        <Helmet titleTemplate="%s - Electron" defaultTitle="Electron">
          <meta name="description" content="An Electron application using React.js" />
        </Helmet>
        <AppWrapper>{children}</AppWrapper>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};
