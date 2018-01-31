// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import TokenForm from '../containers/TokenForm';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <img src="images/icon.png" alt="Logo" />
          <h2>Universal Presenter Remote</h2>
          <TokenForm />
          <Link to="/counter">Start Presenting</Link>
        </div>
      </div>
    );
  }
}
