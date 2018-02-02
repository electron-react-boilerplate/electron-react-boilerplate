// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ConnectButton.css';

type Props = {
  token: string
};

export default class TokenForm extends Component<Props> {
  props: Props;

  render() {
    if (this.props.token.includes('_')) {
      return (
        <div className={styles.connectButton}>
          <a>Disabled</a>
        </div>
      );
    }

    return (
      <div className={styles.connectButton}>
        <Link to="/counter">Start Presenting</Link>
      </div>
    );
  }
}
