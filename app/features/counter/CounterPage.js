import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from './Counter';
import { counterActions } from './counterSlice';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(counterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
