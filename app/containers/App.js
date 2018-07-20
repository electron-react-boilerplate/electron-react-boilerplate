// @flow
import React, { Component, Fragment } from 'react';

type Props = {
  children: React.Node
};

export default class App extends Component<Props> {
  props: Props;

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
