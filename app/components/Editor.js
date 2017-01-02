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
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      value={editorContent}
      width='100%'
      fontSize='20pt'
      />

  )
}


