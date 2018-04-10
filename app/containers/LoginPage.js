import { connect } from 'react-redux';
import Login from '../components/Login';

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  if (loggingIn === undefined) {
    return { loggingIn: false };
  }
  return {
    loggingIn
  };
}

export default connect(mapStateToProps)(Login);
