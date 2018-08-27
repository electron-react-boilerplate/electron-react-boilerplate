// @flow
import React, { Component } from 'react';
import UPRKit from '../UPRKit';
import styles from './ConnectButton.css';

const { dialog } = require('electron').remote;

type Props = {
  token: string,
  history: {
    push: (a: *, b: *) => *
  },
  actions: {
    tokenActions: {
      resetToken: () => void
    },
    holdForActions: {
      setHoldFor: (string) => void
    }
  }
};

export default class TokenForm extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.joinSession = this.joinSession.bind(this);
  }

  async joinSession(event) {
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = 'Joining...';
    const status = await UPRKit.Session.joinSession(this.props.token);
    if (status.data > 0) {
      button.innerHTML = originalText;
      this.props.actions.holdForActions.setHoldFor(status.data.toString());
      this.props.history.push('/present');
    } else {
      console.error(status);
      button.innerHTML = originalText;
      dialog.showErrorBox('Whoops!', 'The token you entered does not appear to be valid.');
      this.props.actions.tokenActions.resetToken();
    }
  }

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
        <a onClick={this.joinSession}>Start Presenting</a>
      </div>
    );
  }
}
