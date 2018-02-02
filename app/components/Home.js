// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import TokenForm from '../containers/TokenForm';
import ConnectButton from '../components/ConnectButton';

type Props = {
  token: string
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <img src="images/icon.png" alt="Logo" />
          <h2>Universal Presenter Remote</h2>
          <TokenForm />
          <ConnectButton token={this.props.token} />
        </div>
      </div>
    );
  }
}
