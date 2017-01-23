import React, { Component } from 'react';
import brace from 'brace';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/twilight';
import Editor from 'react-ace';
import {
  View,
  MasterDetailsView,
  MasterDetailsViewItem,
  MasterDetailsViewItemMaster,
  MasterDetailsViewItemDetails,
  Text,
  Button
} from 'react-desktop/windows';

export default function (props) { //props is now from MY POV
  let jobIDs = Object.keys(props.jobs);
  return (

    <View
      color={props.color}
      theme={props.theme}
      // layout='vertical'
      // horizontalAlignment='center'
      width='100%'
      height='100%'
      >
      {(jobIDs.length > 0) ?
        <MasterDetailsView width='100%' color={props.color} theme={props.theme}>
          {jobIDs.map(jobID =>
            <MasterDetailsViewItem theme={props.theme} key={jobID} >
              <MasterDetailsViewItemMaster theme={props.theme}>
                {jobID}
              </MasterDetailsViewItemMaster>
              {props.jobs[jobID].results ?
                <MasterDetailsViewItemDetails theme={props.theme}>
                  <Editor
                    mode="java"
                    theme={props.theme === 'dark' ? 'twilight' : 'github'}
                    theme='twilight'
                    name="RESULTS2" //TODO: Change this to a generated value when we add multiple editors
                    editorProps={{ $blockScrolling: Infinity }}
                    value={props.jobs[jobID].results}
                    readOnly
                    editorProps={{
                      $blockScrolling: Infinity,
                      readOnly: true
                    }}
                    width='100%'
                    height='95vh'
                    fontSize={20}
                    />
                </MasterDetailsViewItemDetails>
                :
                <MasterDetailsViewItemDetails background theme={props.theme} style={{ flexFlow: 'column' }}>
                  <Text padding="20px" color={props.theme === 'dark' ? "white" : "black"} >Job ID: {jobID}</Text>
                  <Text padding="20px" color={props.theme === 'dark' ? "white" : "black"} >Owner: {props.jobs[jobID].owner}</Text>
                  <Text padding="20px" color={props.theme === 'dark' ? "white" : "black"} >Status: {props.jobs[jobID].status}</Text>
                  <Text padding="20px" color={props.theme === 'dark' ? "white" : "black"} ># Files: {props.jobs[jobID].numberOfSpoolFiles}</Text>
                  <Button push color='red' onClick={() => props.deleteJob(jobID)}>
                    Delete
              </Button>
                  {(props.jobs[jobID].numberOfSpoolFiles > 0) ?
                    <Button push color='green'
                      onClick={() => props.retrieveJob(jobID)}>
                      Download
                    </Button>
                    : ''}
                </MasterDetailsViewItemDetails>
              }
            </MasterDetailsViewItem>)}
        </MasterDetailsView>
        // Nested Ternary. Check it we are connected.
        : (props.isConnected) ?
          // If we are, display that the queue is empty.
          <Text color="white">Connected, but the Mainframe queue is empty</Text> :
          // Otherwise, display the connect and refresh message.
          <Text color="white">Connect and Refresh to see results!</Text>
      }
    </View >
  );
}