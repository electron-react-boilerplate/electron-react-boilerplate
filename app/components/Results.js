import React from 'react';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/twilight';
import Editor from 'react-ace';
import { connect } from 'react-redux';
import {
  View,
  MasterDetailsView,
  MasterDetailsViewItem,
  MasterDetailsViewItemMaster,
  MasterDetailsViewItemDetails,
  Text,
  Button
} from 'react-desktop/windows';
import jes from '../utils/jesFtp';

const { dialog } = require('electron').remote;


function Results(props) { // props is now from MY POV
  const jobIDs = Object.keys(props.jobs);
  return (

    <View
      color={props.color}
      theme={props.theme}
      // layout='vertical'
      // horizontalAlignment='center'
      width="100%"
      height="100%"
    >
      {(jobIDs.length > 0) ?
        <MasterDetailsView width='100%' color={props.color} theme={props.theme}>
          {jobIDs.map(jobID =>
            <MasterDetailsViewItem theme={props.theme} key={jobID} >
              <MasterDetailsViewItemMaster theme={props.theme}>
                {jobID}
              </MasterDetailsViewItemMaster>
              {props.jobs[jobID].results ?
                <MasterDetailsViewItemDetails background theme={props.theme}>
                  <Editor
                    mode="java"
                    theme={props.theme === 'dark' ? 'twilight' : 'github'}
                    name="RESULTS2" // TODO: Change this to a generated value when we add multiple editors
                    value={props.jobs[jobID].results}
                    readOnly
                    editorProps={{
                      $blockScrolling: Infinity,
                      readOnly: true
                    }}
                    width="100%"
                    height="95vh"
                    fontSize={20}
                  />
                </MasterDetailsViewItemDetails>
                :
                <MasterDetailsViewItemDetails background theme={props.theme} style={{ flexFlow: 'column' }}>
                  <Text padding="20px" color={props.theme === 'dark' ? 'white' : 'black'} >Job ID: {jobID}</Text>
                  <Text padding="20px" color={props.theme === 'dark' ? 'white' : 'black'} >Owner: {props.jobs[jobID].owner}</Text>
                  <Text padding="20px" color={props.theme === 'dark' ? 'white' : 'black'} >Status: {props.jobs[jobID].status}</Text>
                  <Text padding="20px" color={props.theme === 'dark' ? 'white' : 'black'} ># Files: {props.jobs[jobID].numberOfSpoolFiles}</Text>
                  <Button push color="red" onClick={() => props.deleteJob(jobID)}>
                    Delete
              </Button>
                  {(props.jobs[jobID].numberOfSpoolFiles > 0) ?
                    <Button
                      push
                      color="green"
                      onClick={() => { props.retrieveJob(jobID); }}
                    >
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
    </View>
  );
}

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
    theme: state.uiStyle.theme,
    color: state.uiStyle.color,
    isConnected: state.results.isConnected
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteJob: (jobID) => {
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Cancel', 'Delete'],
        defaultId: 0,
        title: 'Confirm deletion',
        message: `Are you sure that you want to delete ${jobID} from the mainframes job entry subsystem?. This is irreversible.`,
        noLink: true
      },
        (response) => {
          console.log('Button chosed was: ', response);
          if (response === 1) {
            console.log('Delete was confirmed');
            jes.deleteJob(jobID); // jes.deleteJob has a dispatch statement in it.
          }
        });
    },
    retrieveJob: (jobID) => {
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Cancel', 'Download'],
        defaultId: 0,
        title: 'Confirm download',
        message: `Are you sure that you want to download ${jobID}.`,
        noLink: true
      },
        (response) => {
          console.log('Button chosed was: ', response);
          if (response === 1) {
            console.log('Dowload was confirmed');
            jes.retrieveJob(jobID); // jes.retrieveJob has a dispatch statement in it.
          }
        });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
