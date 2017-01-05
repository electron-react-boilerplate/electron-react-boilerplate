// @flow
import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';

function mapStateToProps(state) {
  return {
    currentStep: state.results.currentStep,
    isConnected: state.results.isConnected,
    isSubmitted: state.results.isSubmitted,
    isRetrieved: state.results.isRetrieved,
    isDisconnected: state.results.isDisconnected,
  };
}

export default connect(mapStateToProps)(StatusBar);