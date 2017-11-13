// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Social.css';

export default class Social extends Component {
  render() {
    return (
        <div className="sub-75" data-tid="container">
          <h2>Social</h2>
          <Link to="/">to Home</Link>
        </div>
    );
  }
}
