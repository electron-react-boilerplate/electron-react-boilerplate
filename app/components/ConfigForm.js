import React from 'react';
import { connect } from 'react-redux';
import { View, Radio, Label } from 'react-desktop/windows';
import { setHostName, setFtpPort, setFtpUserName, setFtpPassword } from '../actions/configForm.js';
import { setThemeDark, setThemeLight } from '../actions/uiStyle';

function ConfigForm(props) {
  const hostName = props.hostName;
  const ftpPort = props.ftpPort;
  const ftpUserName = props.ftpUserName;
  const ftpPassword = props.ftpPassword;
  return (
    <View
      color={props.color}
      theme={props.theme}
      layout="vertical"
      horizontalAlignment="center"
      width="100%"
      height="100%"
    >
      <Label color={props.theme === 'dark' ? 'white' : '#333'}>Hostname or IP</Label>
      <input
        key="hostName"
        style={
          props.theme === 'dark' ? {
            background: 'black',
            color: 'white'
          } : {
            background: 'white',
            color: 'black'
          }
        }
        placeholder="192.168.0.1"
        onChange={(evt) => props.setHostName(evt.target.value)}
        value={hostName}
      />
      <Label color={props.theme === 'dark' ? 'white' : '#333'}>FTP Port</Label>
      <input
        key="ftpPort"
        style={
          props.theme === 'dark' ? {
            background: 'black',
            color: 'white'
          } : {
            background: 'white',
            color: 'black'
          }
        }
        onChange={(evt) => props.setFtpPort(evt.target.value)}
        value={ftpPort}
      />
      <Label color={props.theme === 'dark' ? 'white' : '#333'}>FTP User Name</Label>
      <input
        key="ftpUserName"
        style={
          props.theme === 'dark' ? {
            background: 'black',
            color: 'white'
          } : {
            background: 'white',
            color: 'black'
          }
        }
        placeholder="Gene.Amdahl"
        onChange={(evt) => props.setFtpUserName(evt.target.value)}
        value={ftpUserName}
      />
      <Label color={props.theme === 'dark' ? 'white' : '#333'}>FTP Password</Label>
      <input
        key="ftpPassword"
        style={
          props.theme === 'dark' ? {
            background: 'black',
            color: 'white',
          } : {
            background: 'white',
            color: 'black',
          }
        }
        placeholder="Password"
        type="password"
        value={ftpPassword}
        onChange={(evt) => props.setFtpPassword(evt.target.value)}
      />
      <Label color={props.theme === 'dark' ? 'white' : '#333'}>Theme</Label>
      <View layout="horizontal" theme={props.theme}>
        <Radio
          theme={props.theme}
          color={props.color}
          label="Dark"
          name="radio0"
          onChange={() => props.setThemeDark()}
          defaultChecked={props.theme === 'dark'}
        />
        <span
          style={{ marginLeft: '5px' }}
        />
        <Radio
          theme={props.theme}
          color={props.color}
          label="Light"
          name="radio0"
          onChange={() => props.setThemeLight()}
          defaultValue="Light was checked!"
          defaultChecked={props.theme === 'light'}
        />
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    hostName: state.config.hostName,
    ftpPort: state.config.ftpPort,
    ftpUserName: state.config.ftpUserName,
    ftpPassword: state.config.ftpPassword,
    theme: state.uiStyle.theme,
    color: state.uiStyle.color
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setHostName: (hostName) => dispatch(setHostName(hostName)),
    setFtpPort: (ftpPort) => dispatch(setFtpPort(ftpPort)),
    setFtpUserName: (ftpUserName) => dispatch(setFtpUserName(ftpUserName)),
    setFtpPassword: (ftpPassword) => dispatch(setFtpPassword(ftpPassword)),
    setThemeDark: () => dispatch(setThemeDark()),
    setThemeLight: () => dispatch(setThemeLight())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigForm);
