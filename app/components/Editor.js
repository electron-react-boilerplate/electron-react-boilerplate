import brace from 'brace'; // This is needed
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/twilight';
import AceEditor from 'react-ace';
import React from 'react';
import { connect } from 'react-redux';
import { setEditorContent } from '../actions/editor';

function Editor(props) {
  return (
    <AceEditor
      mode="java"
      theme={props.theme === 'dark' ? 'twilight' : 'github'}
      onChange={props.setEditorContent}
      name="EDITOR" // TODO: Change this to a generated value when we add multiple editors
      editorProps={{ $blockScrolling: Infinity }}
      value={props.editorContent}
      width="100%"
      height="100%"
      fontSize={20}
    />
  );
}

function mapStateToProps(state) {
  return {
    editorContent: state.editor.editorContent,
    theme: state.uiStyle.theme,
    color: state.uiStyle.color
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEditorContent: (newValue) => dispatch(setEditorContent(newValue))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
