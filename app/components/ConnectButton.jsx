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
          <a>Enter a token...</a>
        </div>
      );
    }

    return (
      <div className={styles.connectButton}>
        <Link to="/present">Start Presenting</Link>
      </div>
    );
  }
}
