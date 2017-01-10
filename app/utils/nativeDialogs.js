const {dialog} = require('electron').remote;
import { readFileSync, writeFileSync } from 'fs';
import { setEditorContent, setEditorPath } from '../actions/editor';
import { setCurrentStep, setIsConnected, setIsSubmitted, setIsRetrieved, setIsDisconnected } from '../actions/results';
import { store } from '../index';
const PromiseFtp = require('promise-ftp');

//HACK: Bypassing react-redux to directly dispatch to store.
export function openFilePicker() {
  dialog.showOpenDialog({ properties: ['openFile', 'createDirectory', 'showHiddenFiles'] }, function (fileNames) {
    if (fileNames && fileNames.length) {
      let fileContents = readFileSync(fileNames[0], 'utf8');
      store.dispatch(setEditorContent(fileContents)); //Save content to redux
      store.dispatch(setEditorPath(fileNames[0])); //Save content to redux
      //TODO: Save current path to redux;
    }
  })
}

export function newFile() {
  //TODO: Check to see if the current open file has unsaved changes
  store.dispatch(setEditorContent(''));
  store.dispatch(setEditorPath(''));
}

export function saveFile(overwrite = false) {
  let currentPath = store.getState().editor.editorPath;
  let editorContent = store.getState().editor.editorContent;
  console.log("Current Path is: ", currentPath);
  if (overwrite && currentPath) {
    writeFileSync(currentPath, editorContent);
    console.log("Saved to ", currentPath);
  } else {
    let saveAsPath = dialog.showSaveDialog();
    if (saveAsPath) {
      writeFileSync(saveAsPath, editorContent);
      console.log("Saved to ", saveAsPath);
      store.dispatch(setEditorPath(saveAsPath))
    }
    //Open SaveAs dialog
    //If SaveAs was saved, not cancelled, save the file to disk
  }
  //TODO: Check to see if the current open file has unsaved changes
}

export function testIndicators() {
  let tests = [
    () => setCurrentStep('connecting'),
    () => setCurrentStep('submitting'),
    () => setCurrentStep('retrieving'),
    () => setCurrentStep('disconnecting'),
    () => setCurrentStep(''),
    () => setIsConnected(true),
    () => setIsSubmitted(true),
    () => setIsRetrieved(true),
    () => setIsDisconnected(true),
    () => setIsConnected(false),
    () => setIsSubmitted(false),
    () => setIsRetrieved(false),
    () => setIsDisconnected(false),
  ];
  tests.forEach((test, index) => {
    window.setTimeout(
      () => { store.dispatch(test()) },
      2000 * (index)
    )
  });
}

export function disconnect() {
  //
}

export function testMainframeJobConnect() {
  // Clear all indicators
  store.dispatch(setIsConnected(false));
  store.dispatch(setIsSubmitted(false));
  store.dispatch(setIsRetrieved(false));
  store.dispatch(setIsDisconnected(false));

  // Pull current connection info from the Redux store
  let host = store.getState().config.hostName;
  let port = store.getState().config.ftpPort;
  let user = store.getState().config.ftpUserName;
  let password = store.getState().config.ftpPassword;

  // Step 1: Try to Connect
  store.dispatch(setCurrentStep('connecting'));
  console.log({ host, port, user, password });

  var ftp = new PromiseFtp();
  var connectionStatus = '';
  ftp.connect({ host, port, user, password })
    // Step 2: Set as Connected
    .then((msg) => {
      console.log("Server responded with ", msg);
      connectionStatus = ftp.getConnectionStatus();
      console.log("Connection Status: ", connectionStatus);
      if (connectionStatus === 'connected') {
        store.dispatch(setCurrentStep(''));
        store.dispatch(setIsConnected(true));
      }
    })
    // Step 3: Switch to JES
    .then(() => {
      store.dispatch(setCurrentStep('submitting'));
      return ftp.site('FILETYPE=jes');
    })
    .then((resultsObj) => {
      console.log("Server responded to FILETYPE=jes with " + resultsObj.code + ' ' + resultsObj.text);
    })
    // Step 4: Submit Content to JES as Job
    // This is accepted... not sure if it really is submitting the source. It produces '0 Spool Files' as output
    .then(() => ftp.ascii())
    .then((buffer) => ftp.put(Buffer.from(store.getState().editor.editorContent), '/'))
    // Step 5: Query Jobs
    .then(() => ftp.list(''))
    .then((results) => {
      console.log("Lists shows: ", results);
      if (!results || results.length === 0) {
        throw new Error("No jobs found on JES Queue. Did you forget to name your JCL job using your FTP username?");
      }
      let mostRecentJob = results[results.length - 1];
      let mostRecentJobSplit = mostRecentJob.split(' ');
      let job = {
        name: mostRecentJobSplit[0],
        number: mostRecentJobSplit[1],
        status: mostRecentJobSplit[2]
      }
    })
    // Step 99: Disconnect
    .then(async () => {
      ftp.end();
      connectionStatus = ftp.getConnectionStatus();
      console.log("Connection Status: ", connectionStatus);
      if (connectionStatus === 'disconnecting') {
        store.dispatch(setCurrentStep('disconnecting'));
      }
      let numTries = 3;
      while (connectionStatus === 'disconnecting' && numTries > 0) {
        await sleep(2000);
        connectionStatus = ftp.getConnectionStatus();
        console.log("Connection Status: ", connectionStatus);
        numTries--
      }
      if (numTries == 0) {
        throw new Error("Failed to gracefully disconnect from the server")
      }
      store.dispatch(setCurrentStep(''));
      // Clear all indicators
      store.dispatch(setIsConnected(false));
      store.dispatch(setIsSubmitted(false));
      store.dispatch(setIsRetrieved(false));
      store.dispatch(setIsDisconnected(false));
    })
    .catch((err) => {
      console.log("Error of ", err);
      store.dispatch(setCurrentStep(''));
    })
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}