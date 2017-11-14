// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Social extends Component {
  render() {
    return (
        <div  data-tid="container">
              <h2>Social</h2>
              <Link to="/">to Home</Link>
        </div>
    );
  }
}
