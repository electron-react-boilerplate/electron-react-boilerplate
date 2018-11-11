import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import BackButton from './BackButton';

export const Header = ({ header, backButtonEnabled, history }) => (
  <AppBar position="static" color="default">
    <Toolbar>
      {backButtonEnabled ? <BackButton history={history} /> : null}
      <Typography variant="h6" color="inherit" data-tid="title">
        {typeof header === 'function' ? header() : header}
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  backButtonEnabled: PropTypes.bool,
  history: ReactRouterPropTypes.history,
};

Header.defaultProps = {
  header: '',
  backButtonEnabled: false,
  history: null,
};

export default Header;
