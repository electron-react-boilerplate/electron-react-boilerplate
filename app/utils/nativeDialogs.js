const {dialog} = require('electron').remote;

import loadFile from './filesystem';

export default function openFilePicker() {
  console.log("yo yo");
  dialog.showOpenDialog({properties: ['openFile', 'createDirectory', 'showHiddenFiles']}, function (fileNames) {
    console.log(fileNames[0]); // an array
    return loadFile(fileNames[0]);
  })
};