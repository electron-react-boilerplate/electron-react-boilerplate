// @flow
import React, { Component } from 'react';
import styles from './Login.css';
import TokenForm from '../containers/TokenForm';
import ConnectButton from '../containers/ConnectButton';
import Logo from '../images/icon.png';

type Props = {
  token: string
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <img src={Logo} alt="Logo" />
          <h2>Universal Presenter Remote</h2>
          <TokenForm />
          <ConnectButton token={this.props.token} />
        </div>
      </div>
    );
  }
}
