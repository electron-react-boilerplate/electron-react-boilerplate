// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

import { AppBar } from 'react-toolbox/lib/app_bar';
import { Button } from 'react-toolbox/lib/button';
import { Navigation } from 'react-toolbox/lib/navigation';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <AppBar label="Electron React Toolbox">
            <Navigation type="horizontal">
              <Link to="/counter">to Counter</Link>
            </Navigation>
          </AppBar>
          <h2>Home</h2>
          <Button label="click me" />
        </div>
      </div>
    );
  }
}
