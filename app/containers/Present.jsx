import { connect } from 'react-redux';
import Present from '../components/Present';

function mapStateToProps(state) {
  return {
    token: state.token,
    holdFor: state.holdFor
  };
}

export default connect(mapStateToProps, null)(Present);
