import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ErrorReporting from '../components/ErrorReporting';
import * as ErrorReportingActions from '../actions/errorReporting';

function mapStateToProps(state) {
  return {
    isReportingErrors: state.errorReporting
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ErrorReportingActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorReporting);
