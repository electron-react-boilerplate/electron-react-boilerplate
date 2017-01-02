// @flow
import { connect } from 'react-redux';
import Editor from '../components/Editor';
import { setEditorContent } from '../actions/editor';

function mapStateToProps(state) {
  return {
    editorContent: state.editor.editorContent
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEditorContent: (newValue) => dispatch(setEditorContent(newValue))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor);