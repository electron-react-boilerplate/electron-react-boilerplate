import React from 'react';
import { Window, TitleBar, Text } from 'react-desktop/windows';

export default function (props) { //props is now from MY POV
  console.log("Props.children ", props.children);

  const editorContent = props.editorContent;
  const setEditorContent = props.setEditorContent;

  return (
    <Window
      color={props.color}
      theme={props.theme}
      chrome
      height="auto"
      padding="12px"
      >
      <TitleBar title="Keypunch" controls />
      <div>
        {props.children}
      </div>
    </Window>
  )
}

