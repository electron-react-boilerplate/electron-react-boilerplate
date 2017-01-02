// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';

function mapStateToProps(state) {
  return {
    theme: state.uiStyle.theme,
    color: state.uiStyle.color
  };
}

export default connect(mapStateToProps)(Home);