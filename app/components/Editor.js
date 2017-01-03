import brace from 'brace';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/twilight';
import Editor from 'react-ace';
import React from 'react';

export default function (props) { //props is now from MY POV
  const editorContent = props.editorContent;
  const setEditorContent = props.setEditorContent;
  const theme = props.theme;
  const color = props.color;

  return (
    <Editor
      mode="java"
      theme={theme === 'dark' ? 'twilight' : 'github'}
      onChange={setEditorContent}
      name="EDITOR" //TODO: Change this to a generated value when we add multiple editors
      editorProps={{ $blockScrolling: Infinity }}
      value={editorContent}
      width='100%'
      height='100vh'
      fontSize={20}
      />

  )
}


