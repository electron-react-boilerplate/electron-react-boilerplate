import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

export default class WorkoutChart extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>I am a Chart page</h2>
        </div>
      </div>
    );
  }
}
