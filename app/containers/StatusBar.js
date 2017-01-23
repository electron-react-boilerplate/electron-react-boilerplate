// @flow
import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';
import { testIndicators } from '../utils/nativeDialogs';
import jes from '../utils/jesFtp';
import { store } from '../index';
const {dialog} = require('electron').remote;

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
      dispatch(testIndicators)
    },
    jesConnect: (evt) => {
      evt.preventDefault();
      dispatch(jes.connect)
    },
    disconnect: (evt) => {
      evt.preventDefault();
      dispatch(jes.disconnect)
    },

    submitJob: (evt) => {
      evt.preventDefault();
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Cancel', 'Submit'],
        defaultId: 0,
        title: 'Confirm Job Submission',
        message: `Are you sure that you want to submit your batch job?`,
        noLink: true
      },
        (response) => {
          console.log("Button chosed was:", response);
          if (response === 1) {
            console.log("Job Sumbission was confirmed");
            jes.submitJob(Buffer.from(store.getState().editor.editorContent))

          }
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);