import {SET_EDITOR_CONTENT} from '../constants';

export const setEditorContent = editorContent => ({
  type: SET_EDITOR_CONTENT,
  editorContent
});