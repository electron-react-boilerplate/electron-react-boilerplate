// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

class Bundle extends Component {

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  props: {
    children: Children,
    load: () => Promise
  }

  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  load(props) {
    this.setState({
      mod: null
    });
    props.load().then(mod => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      });
      return mod;
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return this.props.children(this.state.mod);
  }
}

export default Bundle;
