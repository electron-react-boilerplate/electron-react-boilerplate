// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.css';

/*
 * See Login form/page mockup at https://share.goabstract.com/a8fa671d-82d4-4c2b-9635-24bcc2656f75
 */
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
            <div className="container h-100 border-primary justify-content-center">
              <h6 className="text-center">Connect to the DBL</h6>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input placeholder="username" name="email" type="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange} />
                </div>
                <div className="form-group">
                  <input placeholder="password" name="password" type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-block btn-primary center-block">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
