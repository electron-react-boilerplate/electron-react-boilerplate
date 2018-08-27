// @flow
import { connect } from 'react-redux';
import Home from '../components/Login';

function mapStateToProps(state) {
  return {
    token: state.token
  };
}

export default connect(
  mapStateToProps,
  null
)(Home);
