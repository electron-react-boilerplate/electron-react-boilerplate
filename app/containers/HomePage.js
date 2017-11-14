// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import NavBar from '../components/NavBar';
import StyleGuide from '../components/StyleGuide';

export default class HomePage extends Component {
  render() {
    return (
    <div>
      <div className="dragableWindowArea">&nbsp;</div>
      <div className="row">
        <div className="col-3">
          <NavBar />
        </div>
        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-5 padContainer">
          <Home />
        </div>
      </div>
    </div>
    );
  }
}
