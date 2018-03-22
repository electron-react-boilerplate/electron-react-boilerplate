// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.css';

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  login: () => void,
  counter: number
};

export default class Login extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      login, increment, incrementIfOdd, incrementAsync, decrement, counter
    } = this.props;

    return (
      <div>
        <div className={styles.leftColumn} >
          <div className={styles.backButton} data-tid="backButton">
            <Link to="/">
              <i className="fa fa-arrow-left fa-3x" />
            </Link>
          </div>

          <div className={styles.container} data-tid="container">
            <img className={styles.loginLogo} src="./image/Logo.png" alt="Logo" />
            <h2>MEMBER LOGIN</h2>
            <button onClick={login} className={styles.loginBtn}>
              Login
            </button>

            <div className={`login ${styles.counter}`} data-tid="login">
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
              <button className={styles.btn} onClick={() => incrementAsync()} data-tclass="btn">async</button>
            </div>

          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.container} data-tid="container">
            <div className={styles.row}>
              <label>
              Email
                <input
                  name="email"
                  type="string"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className={styles.row}>
              <label>
              Password
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <button onClick={login} className={styles.loginBtn}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
