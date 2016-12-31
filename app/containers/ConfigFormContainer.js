import React from 'react';
import store from '../store';

import ConfigForm from '../components/ConfigForm';
import { setHostName, setFtpPort, setFtpUserName, setFtpPassword } from '../action-creators/configForm.js';
import '../ConfigForm.css';

class ConfigFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, store.getState());
    this.onHostNameChange = this.onHostNameChange.bind(this);
    this.onFtpPortChange = this.onFtpPortChange.bind(this);
    this.onFtpUserNameChange = this.onFtpUserNameChange.bind(this);
    this.onFtpPasswordChange = this.onFtpPasswordChange.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onHostNameChange(hostName) {
    store.dispatch(setHostName(hostName));
  }
  onFtpPortChange(ftpPort) {
    store.dispatch(setFtpPort(ftpPort));
  }
  onFtpUserNameChange(ftpUserName) {
    store.dispatch(setFtpUserName(ftpUserName));
  }
  onFtpPasswordChange(ftpPassword) {
    store.dispatch(setFtpPassword(ftpPassword));
  }

  render() {
    // console.log('jcl is ', JCLHighlightRules());
    // console.log('render ', this.state.editor.editorContent);
    return (
      <ConfigForm
        hostName = {this.state.config.hostName}
        ftpPort = {this.state.config.ftpPort}
        ftpUserName = {this.state.config.ftpUserName}
        ftpPassword = {this.state.config.ftpPassword}
        onHostNameChange = {this.onHostNameChange}
        onFtpPortChange = {this.onFtpPortChange}
        onFtpUserNameChange = {this.onFtpUserNameChange}
        onFtpPasswordChange = {this.onFtpPasswordChange}
      />
    )
  }
}

export default ConfigFormContainer;