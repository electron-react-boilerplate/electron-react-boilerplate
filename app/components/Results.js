import brace from 'brace';
import 'brace/theme/github';
import 'brace/theme/twilight';
import Editor from 'react-ace';
import React from 'react';

export default function (props) { //props is now from MY POV
  const resultsContent = props.resultsContent;
  console.log(resultsContent);
  const theme = props.theme;
  const color = props.color;

  return (
    <Editor
      theme={theme === 'dark' ? 'twilight' : 'github'}
      name="RESULTS" //TODO: Change this to a generated value when we add multiple editors
      value={resultsContent}
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
}


