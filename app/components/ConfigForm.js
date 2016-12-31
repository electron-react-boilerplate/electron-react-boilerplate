import React from 'react';
import { TextInput } from 'react-desktop/windows';

export default function (props) {
  let hostName = props.hostName;
  let ftpPort = props.ftpPort;
  let ftpUserName = props.ftpUserName;
  let ftpPassword = props.ftpPassword;
  const setHostName = props.setHostName;
  const setFtpPort = props.setFtpPort;
  const setFtpUserName = props.setFtpUserName;
  const setFtpPassword = props.setFtpPassword;

  return (
    <div>
      <form className='container'>
        <br />
        <TextInput
          placeholder="192.168.0.1"
          label="Hostname or IP"
          onChange={(evt) => {
            evt.preventDefault();
            setHostName(evt.target.value);
          } }
          value={hostName}
          /><br />
        <TextInput
          label="FTP Port"
          onChange={(evt) => {
            evt.preventDefault();
            setFtpPort(evt.target.value);
          } }
          value={ftpPort}
          /><br />
        <TextInput
          placeholder="Gene.Amdahl"
          label="FTP User Name"
          onChange={(evt) => {
            evt.preventDefault();
            setFtpUserName(evt.target.value);
          } }
          value={ftpUserName}
          /><br />
        <TextInput
          placeholder="Password"
          label="FTP Password"
          onChange={(evt) => {
            evt.preventDefault();
            setFtpPassword(evt.target.value);
          } }
          value={ftpPassword}
          /><br />
      </form>
    </div>

  );

}