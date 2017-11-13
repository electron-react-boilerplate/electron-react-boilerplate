// @flow
import React, { Component } from 'react';
import Social from '../components/Social';
import NavBar from '../components/NavBar';

export default class SocialPage extends Component {
  render() {
    return (
    <div className="parent-100">
      <div className="dragableWindowArea">&nbsp;</div>
      <NavBar />
      <Social />
    </div>
    );
  }
}
