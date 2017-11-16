import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ApiExample from '../components/ApiExample';
import * as ApiActions from '../actions/Api';

function mapStateToProps(state) {
  return {
    counter: state.Api
  };
}

ApiActions.fetchJSON('http://wakenmedia.com/data.json');

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ApiActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiExample);
