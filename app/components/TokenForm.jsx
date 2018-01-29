// @flow
import React, { Component } from 'react';
import styles from './TokenForm.css';

type Props = {};

export default class TokenForm extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.tokenForm}>
          <input />
          <input />
          <input />
          <input />
          <input />
          <input />
        </div>
      </div>
    );
  }
}
