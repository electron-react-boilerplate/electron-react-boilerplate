import React from 'react';
import { View } from 'react-desktop/windows';
import { connect } from 'react-redux';

import Indicator from './Indicator';
import { store } from '../index';
import { testIndicators } from '../utils/nativeDialogs';
import jes from '../utils/jesFtp';

const { dialog } = require('electron').remote;

function StatusBar(props) {
  return (
    <View
      style={{
        bottom: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: '10'
      }}
      background="#aaa"
      width="100%"
      height="50px"
      overflow="hidden"
    >
      <button
        style={{
          backgroundColor: 'orange',
          border: 'none',
          color: 'white',
          margin: '4px',
          width: '90px'
        }}
        onClick={props.testIndicators}
      >
        TEST
      </button>
      {!props.isConnected ?
        <button
          style={{
            backgroundColor: 'green',
            border: 'none',
            color: 'white',
            margin: '4px',
            width: '90px'
          }}
          onClick={props.jesConnect}
        >
          CONNECT
      </button>
        :
        <button
          style={{
            backgroundColor: '#C0101D',
            border: 'none',
            color: 'white',
            margin: '4px',
            width: '90px'
          }}
          onClick={props.disconnect}
        >
          INTERRUPT
      </button>
      }

      <div
        style={{
          fontSize: '10px',
          marginTop: '8px',
          marginLeft: '10px',
          color: 'black',
          width: '30px'

        }}
      >
        CONN
        <br />
        <div
          style={{
            marginLeft: '10px',
            marginTop: '3px'
          }}
        >
          <Indicator
            isLit={props.isConnected}
            isBlinking={props.isConnecting}
          />
        </div>
      </div>



      <div
        style={{
          fontSize: '10px',
          marginTop: '8px',
          marginLeft: '10px',
          color: 'black',
          width: '30px'
        }}
      >
        SENT
        <br />
        <div
          style={{
            marginLeft: '9px',
            marginTop: '3px'
          }}
        >
          <Indicator
            isLit={props.isSubmitted}
            isBlinking={props.isSubmitting}
          />
        </div>
      </div>

      <div
        style={{
          fontSize: '10px',
          marginTop: '8px',
          marginLeft: '10px',
          color: 'black',
          width: '30px'
        }}
      >
        RETR
        <br />
        <div
          style={{
            marginLeft: '9px',
            marginTop: '3px'
          }}
        >
          <Indicator
            isLit={props.isRetrieved}
            isBlinking={props.isRetrieving}
          />
        </div>
      </div>

      <div
        style={{
          fontSize: '10px',
          marginTop: '8px',
          marginLeft: '10px',
          color: 'black',
          width: '30px'
        }}
      >
        DISC
        <br />
        <div
          style={{
            marginLeft: '7px',
            marginTop: '3px'
          }}
        >
          <Indicator
            isLit={props.isDisconnected}
            isBlinking={props.isDisconnecting}
          />
        </div>
      </div>

      <button
        style={{
          backgroundColor: '#195DAE',
          border: 'none',
          color: 'white',
          margin: '4px',
          marginLeft: '10px',
          width: '90px'
        }}
        onClick={props.submitJob}
      >
        LOAD
          </button>
    </View >
  );
}

function mapStateToProps(state) {
  return {
    currentStep: state.results.currentStep,
    isConnected: state.results.isConnected,
    isConnecting: state.results.isConnecting,
    isSubmitted: state.results.isSubmitted,
    isSubmitting: state.results.isSubmitting,
    isRetrieved: state.results.isRetrieved,
    isRetrieving: state.results.isRetrieving,
    isDisconnected: state.results.isDisconnected,
    isDisconnecting: state.results.isDisconnecting
  };
}

function mapDispatchToProps(dispatch) {
  return {
    testIndicators: (evt) => {
      evt.preventDefault();
      dispatch(testIndicators);
    },
    jesConnect: (evt) => {
      evt.preventDefault();
      dispatch(jes.connect);
    },
    disconnect: (evt) => {
      evt.preventDefault();
      dispatch(jes.disconnect);
    },

    submitJob: (evt) => {
      evt.preventDefault();
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Cancel', 'Submit'],
        defaultId: 0,
        title: 'Confirm Job Submission',
        message: 'Are you sure that you want to submit your batch job?',
        noLink: true
      },
        (response) => {
          console.log('Button chosed was:', response);
          if (response === 1) {
            console.log('Job Sumbission was confirmed');
            jes.submitJob(Buffer.from(store.getState().editor.editorContent));
          }
        });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
