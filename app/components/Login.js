// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.css';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    alert(`A name was submitted: ${this.state.email}`);
    event.preventDefault();
  }

  render() {
    return (
      <div className="h-100">
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className="row align-items-center h-100">
          <div className="col-6 mx-auto">
            <div className="card h-100 border-primary justify-content-center">
              <div>Connect to the DBL</div>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">
                  Email:
                  <input name="email" type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label htmlFor="password">
                  Password:
                  <input name="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
