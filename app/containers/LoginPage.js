import { connect } from 'react-redux';
import Login from '../components/Login';

/*
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
} */

export default connect()(Login);
