// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { View, Text } from 'react-desktop/windows';

// import openFilePicker from '../utils/nativeDialogs.js';

export default function (props) {
  const theme = props.theme;
  const openFilePicker = props.openFilePicker;

  return (
    <View
      theme={theme}
      background
      layout='vertical'
      horizontalAlignment='center'
      width='100%'
      height='100%'
      >
      <button onClick={openFilePicker}>Open</button>
      <img
      src='../resources/images/keypunchingAtTexasAM.jpg'
      style={{height: '30%', width: '30%'}}/>
    </View>
  );
}