// @flow
import React, { Component } from 'react';
import styles from './Present.css';
import NavBar from './NavBar';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <NavBar title="Present" />
        <div className={styles.container} data-tid="container">
          <h2>Universal Presenter Remote</h2>
        </div>
      </div>
    );
  }
}
