// @flow
import React, { Component } from 'react';

export default class App extends Component {
  props: {
    children: any
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
