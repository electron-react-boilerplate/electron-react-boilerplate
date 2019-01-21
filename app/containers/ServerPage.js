import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServerConfig from '../components/ServerConfig';
import * as ServerActions from '../actions/serverConfig';

function mapStateToProps(state) {
  return {
    server: state.serverConfig
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServerActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerConfig);
