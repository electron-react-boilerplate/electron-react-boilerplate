import { SET_EDITOR_CONTENT, SET_EDITOR_PATH } from '../constants';

const initialEditorState = {
  editorContent: '',
  editorPath: ''
};

export default function (state = initialEditorState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_EDITOR_CONTENT:
      newState.editorContent = action.editorContent;
      break;
    case SET_EDITOR_PATH:
      newState.editorPath = action.editorPath;
      break;
    default:
      return state;
  }
  return newState;
}