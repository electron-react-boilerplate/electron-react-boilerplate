import React from 'react';
import TextField from 'material-ui/TextField';
// import Songs from '../components/Songs';

export default function (props) {
  let hostName = props.hostName;
  let ftpPort = props.ftpPort;
  let ftpUserName = props.ftpUserName;
  let ftpPassword = props.ftpPassword;
  const onHostNameChange = props.onHostNameChange;
  const onFtpPortChange = props.onFtpPortChange;
  const onFtpUserNameChange = props.onFtpUserNameChange;
  const onFtpPasswordChange = props.onFtpPasswordChange;

  return (
    <div>
      <form className='container'>
        <br />
        <TextField
          hintText="192.168.0.1"
          floatingLabelText="Hostname or IP"
          onChange={(evt, newValue) => onHostNameChange(newValue)}
          value={hostName}
          /><br />
        <TextField
          defaultValue="23"
          floatingLabelText="FTP Port"
          onChange={(evt, newValue) => onFtpPortChange(newValue)}
          value={ftpPort}
          /><br />
        <TextField
          hintText="Gene.Amdahl"
          floatingLabelText="FTP User Name"
          onChange={(evt, newValue) => onFtpUserNameChange(newValue)}
          value={ftpUserName}
          /><br />
        <TextField
          hintText="Password Field"
          floatingLabelText="FTP Password"
          type="password"
          onChange={(evt, newValue) => onFtpPasswordChange(newValue)}
          value={ftpPassword}
          /><br />
      </form>
    </div>

  );

}