// @flow
import React, { Component } from 'react';
import type { Element } from 'react';

export default class App extends Component {
  props: {
    children: Element<*>
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
