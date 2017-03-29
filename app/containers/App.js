// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        adsffasdfasd
        asdfasdf
        {this.props.children}
      </div>
    );
  }
}
