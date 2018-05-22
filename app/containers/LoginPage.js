import { connect } from 'react-redux';
import Login from '../components/Login';

function mapStateToProps(state) {
  const { authentication, alert } = state;
  if (authentication.loggingIn === undefined) {
    return { loggingIn: false, alert };
  }
  return {
    loggingIn: authentication.loggingIn, alert
  };
}

export default connect(mapStateToProps)(Login);
