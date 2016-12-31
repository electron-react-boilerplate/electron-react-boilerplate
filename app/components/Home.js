// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Home by Sean</h2>
          <Link to="/counter">to Counter</Link>
          <br/>
          <Link to="/editor">to Editor</Link>
          <br/>
          <Link to="/config">to Config</Link>
        </div>
      </div>
    );
  }
}
