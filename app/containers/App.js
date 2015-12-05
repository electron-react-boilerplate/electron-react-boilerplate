import React, { Component, PropTypes } from 'react';
import DevTools from './DevTools';

const env = process.env.NODE_ENV || 'development';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        {this.props.children}
        {( env !== 'production' ) ? <DevTools /> : ''}
      </div>
    );
  }
}
