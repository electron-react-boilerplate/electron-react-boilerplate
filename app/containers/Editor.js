import { connect } from 'react-redux';
import Editor from '../components/Editor';
import { setEditorContent } from '../actions/editor';


function mapStateToProps(state) {
  console.log("mapStateToProps invoked");
  return {
    editorContent: state.editor.editorContent
  };
}

function mapDispatchToProps(dispatch) {
  console.log("mapDispatchToProps invoked");
  return {
    setEditorContent: (newValue) => dispatch(setEditorContent(newValue))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor);