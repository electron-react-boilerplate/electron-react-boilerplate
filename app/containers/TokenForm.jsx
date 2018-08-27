import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TokenForm from '../components/TokenForm';
import * as TokenActions from '../actions/token';

function mapStateToProps(state) {
  return {
    token: state.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TokenActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenForm);
