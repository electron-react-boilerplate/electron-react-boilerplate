import * as React from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from '../global-styles';

export default class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <GlobalStyle />
        {children}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};
