// @flow
import React, { Component } from 'react';
import styles from './NavBar.css';

type Props = {
  title: string,
  history: {
    push: (a: *, b: *) => *
  }
};

export default class TokenForm extends Component<Props> {
  props: Props;

  goBack() {
    const {
      props: { history }
    } = this;
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
