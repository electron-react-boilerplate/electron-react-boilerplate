const {dialog} = require('electron').remote;
import loadFile from './filesystem';
import { setEditorContent } from '../actions/editor';
import { store } from '../index';

//HACK: Bypassing react-redux to directly dispatch to store.
export default function openFilePicker() {
  dialog.showOpenDialog({ properties: ['openFile', 'createDirectory', 'showHiddenFiles'] }, function (fileNames) {
    if (fileNames && fileNames.length) {
      let fileContents = loadFile(fileNames[0]);
      store.dispatch(setEditorContent(fileContents));
    }
  })
}