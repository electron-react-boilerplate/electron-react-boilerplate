import React, { Component, PropTypes} from 'react';
import DevTools from './DevTools';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        {this.props.children}
        <DevTools />
      </div>
    );
  }
}

