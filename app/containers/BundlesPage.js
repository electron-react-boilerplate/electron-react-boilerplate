// @flow
import React, { Component } from 'react';
import Bundles from '../components/Bundles';

type Props = {};

export default class BundlesPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <Bundles {...this.props} />
    );
  }
}
