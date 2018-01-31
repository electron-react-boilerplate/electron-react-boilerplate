// @flow
import React, { Component } from 'react';
import styles from './TokenForm.css';

type Props = {
  updateToken: () => void
};

export default class TokenForm extends Component<Props> {
  props: Props;

  render() {
    const {
      updateToken
    } = this.props;
    return (
      <div>
        <div className={styles.tokenForm}>
          <input id="0" onChange={updateToken} />
          <input id="1" onChange={updateToken} />
          <input id="2" onChange={updateToken} />
          <input id="3" onChange={updateToken} />
          <input id="4" onChange={updateToken} />
          <input id="5" onChange={updateToken} />
        </div>
      </div>
    );
  }
}
