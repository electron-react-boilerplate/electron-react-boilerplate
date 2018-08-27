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

  goBack() {
    const {
      props: {
        actions: { holdForActions, tokenActions },
        history
      }
    } = this;
    holdForActions.clearHoldFor();
    tokenActions.resetToken();
    UPRKit.Utils.disconnect();
    history.push('/');
  }

  render() {
    const { title } = this.props;
    return (
      <div className={styles.navBar}>
        <div className={styles.backButton} data-tid="backButton">
          <button
            type="button"
            onClick={e => {
              this.goBack(e);
            }}
          >
            <i className="fa fa-angle-left fa-3x" />
            <span>Back</span>
          </button>
        </div>
        <p>{title}</p>
      </div>
    );
  }
}
