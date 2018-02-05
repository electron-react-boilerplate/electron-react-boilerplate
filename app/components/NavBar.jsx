// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.css';

type Props = {
  title: string
};

export default class TokenForm extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.navBar}>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-angle-left fa-3x" />
            <b>Back</b>
          </Link>
        </div>
        <p>{ this.props.title }</p>
      </div>
    );
  }
}
