// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
    <div className="window">
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Welcome to PathDNA</h2>
          <Link to="/counter">to Counter</Link>
          <Link to="/social">to Social</Link>
        </div>
      </div>
    </div>
    );
  }
}
