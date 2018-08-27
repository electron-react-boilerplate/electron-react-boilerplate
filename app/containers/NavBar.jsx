import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import * as TokenActions from '../actions/token';
import * as HoldForActions from '../actions/holdfor';

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      tokenActions: bindActionCreators(TokenActions, dispatch),
      holdForActions: bindActionCreators(HoldForActions, dispatch)
    }
  };
}

export default connect(null, mapDispatchToProps)(withRouter(NavBar));
