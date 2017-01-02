// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Text } from 'react-desktop/windows';

export default function (props) {
  const theme = props.theme;
  
  return (
    <div>
      <Text color={theme === 'dark' ? 'white' : '#333'}>Hello World</Text>
      <div>
        <h2></h2>
        <Link to="/editor">to Editor</Link>
        <br />
        <Link to="/config">to Config</Link>
      </div>
    </div>
  );
}