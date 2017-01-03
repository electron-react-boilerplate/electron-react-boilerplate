import { SET_EDITOR_CONTENT, SET_EDITOR_PATH } from '../constants';

export const setEditorContent = editorContent => ({
  type: SET_EDITOR_CONTENT,
  editorContent
});

export const setEditorPath = editorPath => ({
  type: SET_EDITOR_PATH,
  editorPath
});