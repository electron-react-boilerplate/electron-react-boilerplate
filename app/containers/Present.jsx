import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Present from '../components/Present';
import * as TokenActions from '../actions/token';
import * as HoldForActions from '../actions/holdfor';

function mapStateToProps(state) {
  return {
    token: state.token,
    holdFor: state.holdFor
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      tokenActions: bindActionCreators(TokenActions, dispatch),
      holdForActions: bindActionCreators(HoldForActions, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Present);
