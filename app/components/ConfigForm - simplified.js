import React from 'react';
import { TextInput, Text, View, Radio, Label } from 'react-desktop/windows';

export default function (props) {
  // let hostName = props.hostName;
  // let ftpPort = props.ftpPort;
  // let ftpUserName = props.ftpUserName;
  // let ftpPassword = props.ftpPassword;
  // let setHostName = props.setHostName;
  // let setFtpPort = props.setFtpPort;
  // let setFtpUserName = props.setFtpUserName;
  // let setFtpPassword = props.setFtpPassword;
  // let color = props.color;
  // let theme = props.theme;
  // let setThemeDark = props.setThemeDark;
  // let setThemeLight = props.setThemeLight;

  return (
    <View
      color={props.color}
      theme={props.theme}
      layout='vertical'
      horizontalAlignment='center'
      width='100%'
      height='100%'
      >
      <input
        onChange={(evt) => props.setHostName(evt.target.value)}
        value={props.hostName}
        />
      {//      <TextInput
        //  />
      }
    </View>
  );
}