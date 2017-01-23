import React, { Component } from 'react';
import brace from 'brace';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/twilight';
import Editor from 'react-ace';

export default (props) => (
  <Editor
    mode="java"
    theme={props.theme === 'dark' ? 'twilight' : 'github'}
    theme='twilight'
    name="RESULTS2" //TODO: Change this to a generated value when we add multiple editors
    editorProps={{ $blockScrolling: Infinity }}
    value={props.value}
    readOnly
    editorProps={{
      $blockScrolling: Infinity,
      readOnly: true
    }}
    width='100%'
    height='95vh'
    fontSize={20}
    />
)