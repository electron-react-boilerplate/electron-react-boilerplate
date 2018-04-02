// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.css';

type Props = {
  email: string,
  password: string,
  handleEmailChange: () => void,
  handleSubmit: () => void
};

export default class LoginForm extends Component<Props> {
  props: Props;

  handleSubmit(event) {
    alert(`A name was submitted: ${this.email}`);
    event.preventDefault();
  }

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  render() {
    const {
      email, password, handleEmailChange, handleSubmit
    } = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div>Connect to the DBL</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Name:
            <input type="text" name="email" value={email} onChange={handleEmailChange} />
          </label>
          <label htmlFor="password">
            Password:
            <input type="password" name="password" value={password} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {
        /*
        <div className={`counter ${styles.counter}`} data-tid="counter">
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={increment} data-tclass="btn">
            <i className="fa fa-plus" />
          </button>
          <button className={styles.btn} onClick={decrement} data-tclass="btn">
            <i className="fa fa-minus" />
          </button>
          <button className={styles.btn} onClick={incrementIfOdd} data-tclass="btn">odd</button>
          <button className={styles.btn} onClick={() => incrementAsync()}
            data-tclass="btn">async</button>
        </div>
        */}
      </div>
    );
  }
}
