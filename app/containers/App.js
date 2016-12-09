// @flow
import React, { Component } from 'react';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
