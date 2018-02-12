// @flow
import React, { Component } from 'react';
import styles from './Present.css';
import NavBar from '../containers/NavBar';
import UPRKit from '../UPRKit';

type Props = {
  token: string,
  holdFor: string
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    UPRKit.Utils.listenForEvents(this.props.token, this.props.holdFor);
    return (
      <div>
        <NavBar title="Present" />
        <div className={styles.container} data-tid="container">
          <h2>Universal Presenter Remote</h2>
        </div>
      </div>
    );
  }
}
