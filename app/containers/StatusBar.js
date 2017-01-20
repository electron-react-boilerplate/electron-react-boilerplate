// @flow
import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';
import { testIndicators, testMainframeJobConnect } from '../utils/nativeDialogs';
import jes from '../utils/jesFtp';

function mapStateToProps(state) {
  return {
    currentStep: state.results.currentStep,
    isConnected: state.results.isConnected,
    isSubmitted: state.results.isSubmitted,
    isRetrieved: state.results.isRetrieved,
    isDisconnected: state.results.isDisconnected,
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
    pollJobStatus: (evt) => {
      console.log("Polling Job Status");
      dispatch(jes.pollJobStatus)
      evt.preventDefault();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);