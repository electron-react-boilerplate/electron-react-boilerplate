import React, { Component } from 'react';
import brace from 'brace';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/twilight';
import Editor from 'react-ace';
import {
  MasterDetailsView,
  MasterDetailsViewItem,
  MasterDetailsViewItemMaster,
  MasterDetailsViewItemDetails,
  Text,
  Button
} from 'react-desktop/windows';

export default function (props) { //props is now from MY POV
  console.log("jobTree props are: ", props);
  let jobIDs = Object.keys(props.jobs);
  const renderItem = (master, details) => {
    console.log(master, details);
    return (
      <MasterDetailsViewItem>
        <MasterDetailsViewItemMaster push>
          {master}
        </MasterDetailsViewItemMaster>
        <MasterDetailsViewItemDetails background>
          <Text padding="20px" color="white">{details}</Text>
        </MasterDetailsViewItemDetails>
      </MasterDetailsViewItem>
    );
  }
  return (
    <MasterDetailsView color={props.color} theme={props.theme}>
      {jobIDs.map(jobID =>
        <MasterDetailsViewItem key={jobID} >
          <MasterDetailsViewItemMaster push>
            {jobID}
          </MasterDetailsViewItemMaster>
          {props.jobs[jobID].content ?
            <MasterDetailsViewItemDetails background>
              <Editor
                mode="java"
                // theme={theme === 'dark' ? 'twilight' : 'github'}
                theme='twilight'
                // onChange={setEditorContent}
                name="RESULTS2" //TODO: Change this to a generated value when we add multiple editors
                editorProps={{ $blockScrolling: Infinity }}
                value={JSON.stringify(props.jobs[jobID])}
                readOnly
                editorProps={{
                  $blockScrolling: Infinity,
                  readOnly: true
                }}
                width='100%'
                height='100%'
                fontSize={20}
                />
            </MasterDetailsViewItemDetails>
            :
            <MasterDetailsViewItemDetails background style={{ flexFlow: 'column' }}>
              <Text padding="20px" color="white">Owner: {props.jobs[jobID].owner}</Text>
              <Text padding="20px" color="white">Status: {props.jobs[jobID].status}</Text>
              <Text padding="20px" color="white"># Files: {props.jobs[jobID].numberOfSpoolFiles}</Text>
              <Button push color='red' onClick={() => props.deleteJob(jobID)}>
                Delete
              </Button>
              <Button push color='green' onClick={() => console.log('Clicked!')}>
                Download
              </Button>
            </MasterDetailsViewItemDetails>
          }
        </MasterDetailsViewItem>)}
      {renderItem('Dummy', 'Content 1')}
    </MasterDetailsView>
  );
}
              // <Text padding="20px" color="white">{JSON.stringify(props.jobs[jobID])}</Text>