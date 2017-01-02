// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { View, Text } from 'react-desktop/windows';

export default function (props) {
  const theme = props.theme;

  return (
    <View
      theme={theme}
      background
      layout='vertical'
      horizontalAlignment='center'
      width='100%'
      height='100%'
      >
      <img
      src='../resources/images/keypunchingAtTexasAM.jpg'
      style={{height: '100%', width: '100%'}}/>
    </View>
  );
}