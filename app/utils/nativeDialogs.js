const {dialog} = require('electron').remote;
import { readFileSync, writeFileSync } from 'fs';
import { setEditorContent, setEditorPath } from '../actions/editor';

import { setCurrentStep, setIsConnected, setIsSubmitted, setIsRetrieved, setIsDisconnected } from '../actions/results';
import { store } from '../index';
const PromiseFtp = require('promise-ftp');
// var ftp;

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

// export function testMainframeJobConnect() {
  // Clear all indicators
  // store.dispatch(setIsConnected(false));
  // store.dispatch(setIsSubmitted(false));
  // store.dispatch(setIsRetrieved(false));
  // store.dispatch(setIsDisconnected(false));

  // Pull current connection info from the Redux store
  // let host = store.getState().config.hostName;
  // let port = store.getState().config.ftpPort;
  // let user = store.getState().config.ftpUserName;
  // let password = store.getState().config.ftpPassword;

  // // Step 1: Try to Connect
  // store.dispatch(setCurrentStep('connecting'));
  // console.log({ host, port, user, password });

  // ftp = new PromiseFtp();
  // var connectionStatus = '';
  // var job;
  // ftp.connect({ host, port, user, password })
  //   // Step 2: Set as Connected
  //   .then((msg) => {
  //     console.log("Server responded with ", msg);
  //     connectionStatus = ftp.getConnectionStatus();
  //     console.log("Connection Status: ", connectionStatus);
  //     if (connectionStatus === 'connected') {
  //       store.dispatch(setCurrentStep(''));
  //       store.dispatch(setIsConnected(true));
  //     }
  //   })
    // Step 3: Switch to JES
    // .then(store.dispatch(setCurrentStep('submitting')))
    // .then(() => _switchToJESMode())
    // Step 4: Submit Content to JES as Job
    // This is accepted... not sure if it really is submitting the source. It produces '0 Spool Files' as output
    // _submitCurrentEditorContent()
    // .then((res) => {
    //   console.log("RES after submit as JSON: ", JSON.stringify(res));
    //   console.log("RES after submit: ", res);
    // })
    // // Step 5: Query status of jobs repeatedly until status shows that batch processing is complete
    // .then(() => _pollMostRecentJobUntilComplete(20, 200))
    // // Step 7: Retrieve Results of Job, rendering in results pane
    // .then((_job) => {
    //   job = _job;
    //   console.log("RES after poll as JSON: ", JSON.stringify(job));
    //   console.log("RES after poll: ", job);
    // })
    // .then(() => {
    //   if (job.numberOfSpoolFiles > 0) {
    //     console.log("Your job has output, so retrieving ")
    //     return _retrieveJob(job.jobNumber)
    //   } else {
    //     console.log("Your job has no output, so not retrieving ");
    //     return "No Output on SPOOL";
    //   }
    // })
    // .then((res) => {
    //   console.log("RES after submit as JSON: ", JSON.stringify(res));
    //   console.log("RES after submit: ", res);
    // })
    // .then(() => _deleteJob(job.jobNumber))
    // .then((res) => {
    //   console.log("RES after submit as JSON: ", JSON.stringify(res));
    //   console.log("RES after submit: ", res);
    // })


    // Step 99: Disconnect
    // .then(async () => {
    //   ftp.end();
    //   connectionStatus = ftp.getConnectionStatus();
    //   console.log("Connection Status: ", connectionStatus);
    //   if (connectionStatus === 'disconnecting') {
    //     store.dispatch(setCurrentStep('disconnecting'));
    //   }
    //   let numTries = 3;
    //   while (connectionStatus === 'disconnecting' && numTries > 0) {
    //     await sleep(2000);
    //     connectionStatus = ftp.getConnectionStatus();
    //     console.log("Connection Status: ", connectionStatus);
    //     numTries--
    //   }
    //   if (numTries == 0) {
    //     throw new Error("Failed to gracefully disconnect from the server")
    //   }
    //   store.dispatch(setCurrentStep(''));
    //   // Clear all indicators
    //   store.dispatch(setIsConnected(false));
    //   store.dispatch(setIsSubmitted(false));
    //   store.dispatch(setIsRetrieved(false));
    //   store.dispatch(setIsDisconnected(false));
    // })
    // Attempt to troubleshoot common FTP issues communicating with mainframe
//     .catch((err) => {
//       switch (err.code) {
//         case 451:
//           alert("File Error. Do you have a valid file open in the editor?");
//           console.log(err);
//           break;
//         case 550:
//           alert("Permission Denied (or No such file or folder):\n", err.toString());
//           console.log(err);
//           break;

//         case "Error: PASS command failed(…)":
//           alert("What is a PASS command?");
//           break;
//         default:
//           console.log("|", err, "|");
//           // console.log(err.parse(':'));
//           alert(JSON.stringify(err));
//       }
//       console.log("Error of ", err);
//       store.dispatch(setCurrentStep(''));
//     })
// }


// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// function _switchToJESMode() {
//   return ftp.site('FILETYPE=jes')
//     .then((resultsObj) => {
//       console.log("Server responded to FILETYPE=jes with " + resultsObj.code + ' ' + resultsObj.text);
//     })
// }

// Get all JES jobs and return as an array of objects;
// function _pollJobStatus() {
//   return ftp.list('')
//     .then(results => {
//       if (!results || results.length === 0) {
//         throw new Error("No jobs found on JES Queue. Did you forget to name your JCL job using your FTP username?");
//       }
//       let jobs = {}
//       results.forEach((job) => {
//         let jobSplit = job.trim().split(/\ +/);
//         let jobID = jobSplit[1];
//         jobs[jobID] = {
//           owner: jobSplit[0],
//           status: jobSplit[2],
//           numberOfSpoolFiles: job.includes('Spool Files') ? jobSplit[3] : null,
//           fullString: job.trim()
//         };
//       });
//       store.dispatch(refreshJobs(jobs));
//       return jobs;
//     })
//     .catch(err => console.log('_getJobs ERR: ' + err));
// }

//--------------------------------------------------------------------------------------------------
// _pollMostRecentJobUntilComplete
//     - maxRetries: The Number of times to poll job status before giving up
//     - timeToWait: The amount of time in ms that we should wait between retries
//
//     - RETURNS mostRecentJob
//
// Repeatedly poll job status until the most recent job has a status of output, signifying that
// batch processing is complete. When complete, return the status of the most recent job to
// allow for follow on action.
//
// TODO: Each iteration of the loop recalculates what the mostRecentJob is. This needs to target
// the same JES Job ID.
//
// TODO: Assuming escalated privileges on the current User ID, it is possible that the output of
// _pollJobStatus returns other user's jobs. Based on the workflow of this function, we should
// really treat the most recent job as the most recent job submitted by the user. Perhaps this
// should be handled in _pollJobStatus via an optional flag.
//
//--------------------------------------------------------------------------------------------------
// async function _pollMostRecentJobUntilComplete(maxRetries, timeToWait) {
//   console.log("Attempting to get most recent job");
//   let mostRecentJob;
//   while (!mostRecentJob || mostRecentJob.status !== 'OUTPUT' && maxRetries > 0) {
//     console.log("TriesRemaining: ", maxRetries);
//     let jobs = await _pollJobStatus(ftp);
//     jobIDs = Object.keys(jobs).sort(); //This is a moving target technically, not a set jobID
//     mostRecentJobID = jobIDs[jobIDs.length - 1]; //This is a moving target technically, not a set jobID
//     mostRecentJob = jobs(jobIDs[jobIDs.length - 1]); //This is a moving target technically, not a set jobID
//     if (mostRecentJob.status === 'OUTPUT') {
//       console.log("Most recent job has status of OUTPUT, so returning");
//       return mostRecentJob;
//     }
//     sleep(timeToWait)
//     maxRetries--;
//   }
//   return mostRecentJob;
// }

// TODO: Put returns an empty array, but we expect a string output containing job
// control data such as the job ID. This is probably not getting handled properly
// by the underlying promise-ftp library, but it's possible that I'm not using
// the correct command

// function _submitCurrentEditorContent() {
//   return ftp.ascii()
//     .then(res => {
//       console.log(res);
//       console.log(JSON.stringify(res));
//       return ftp.put(Buffer.from(store.getState().editor.editorContent), '/')
//     })
//     .then(res => {
//       console.log("After PUT:", res);
//       console.log(JSON.stringify(res))
//       ftp.status()
//     })
//     .then(res => {
//       console.log("After status:", res);
//       console.log(JSON.stringify(res))
//     })
//     .catch(err => console.log('_submitCurrentEditorContent ERR: ' + err));
// }

// async function _retrieveJob(jobID) {
//   console.log("Attempted to retrive ", jobID);
//   return ftp.get(jobID + '.x') //The x suffix seems to be needed to retrieve a printout of the jobs output;
//     // return ftp.get(jobID+'.s') //The x suffix seems to be needed to retrieve a printout of the jobs output;
//     .then(function (stream) {
//       return new Promise(function (resolve, reject) {
//         stream.once('close', resolve);
//         stream.once('error', reject);
//         let string;
//         stream.on('readable', (buffer) => {
//           // if (buffer) {// can be undefined sometimes???
//           console.log("BUFFER IS: ", buffer);
//           let part = buffer.read().toString();
//           string += part;
//           console.log('stream data ' + part);
//           // }
//         });
//         stream.on('end', () => console.log('final output ' + string))
//       });
//     })
// }
// try {
//   console.log("Start of try block");
//   let res = await ftp.get(jobID);
//   console.log("JOB RESULTS: ", res);
//   console.log("JOB RESULTS: ", res.toString);
// }
// catch (e) {
//   console.log("ERR", e)
// }
// .catch(err => console.log("err ", err));
// .then(buffer => console.log(buffer.toString))

// async function _deleteJob(jobID) {
//   console.log('Attempted to delete "' + jobID + '"');
//   try {
//     console.log("Start of try block");
//     let res = await ftp.delete(jobID);
//     console.log("JOB RESULTS: ", res);
//     console.log("JOB RESULTS: ", res.toString);
//     return res
//   }
//   catch (e) {
//     console.log("ERR", e)
//   }
// }
