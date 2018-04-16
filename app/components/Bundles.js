// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Bundles.css';

type Props = {};

export default class Bundles extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Bundles</h2>
          <Link to="/login">Logout</Link>
        </div>
      </div>
    );
  }
}
