// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
const {dialog} = require('electron').remote;
import loadFile from '../utils/filesystem';
import { setEditorContent } from '../actions/editor';


function mapStateToProps(state) {
  return {
    theme: state.uiStyle.theme,
    color: state.uiStyle.color
  };
}

//I'm not sure where I should be putting non-store UI logic that I want to encapsulate into functions.
function mapDispatchToProps(dispatch) {
  return {
    openFilePicker: () => {
      dialog.showOpenDialog({ properties: ['openFile', 'createDirectory', 'showHiddenFiles'] }, function (fileNames) {
        console.log(fileNames[0]); // an array
        let fileContents = loadFile(fileNames[0]);
        dispatch(setEditorContent(fileContents));
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);