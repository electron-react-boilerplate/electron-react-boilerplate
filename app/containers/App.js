// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

export default class App extends Component {
  props: {
    children: Children // eslint-disable-line
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
