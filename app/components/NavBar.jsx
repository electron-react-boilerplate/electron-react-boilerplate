// @flow
import React, { Component } from 'react';
import styles from './NavBar.css';
import UPRKit from '../UPRKit';

type Props = {
  title: string,
  actions: {
    tokenActions: {
      resetToken: () => void
    },
    holdForActions: {
      clearHoldFor: () => void
    }
  },
  history: {
    push: (a: *, b: *) => *
  }
};

export default class TokenForm extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.actions.holdForActions.clearHoldFor();
    this.props.actions.tokenActions.resetToken();
    UPRKit.Utils.disconnect();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className={styles.navBar}>
        <div className={styles.backButton} data-tid="backButton">
          <a onClick={this.goBack}>
            <i className="fa fa-angle-left fa-3x" />
            <b>Back</b>
          </a>
        </div>
        <p>{ this.props.title }</p>
      </div>
    );
  }
}
