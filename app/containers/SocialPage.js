// @flow
import React, { Component } from 'react';
import Social from '../components/Social';
import NavBar from '../components/NavBar';
import StyleGuide from '../components/StyleGuide';

export default class SocialPage extends Component {
  render() {
    return (
    <div>
      <div className="dragableWindowArea">&nbsp;</div>
      <div className="row">
        <div className="col-3">
          <NavBar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6 col-xs-4">
          <Social />
          <StyleGuide />
        </div>
      </div>
    </div>
    );
  }
}
