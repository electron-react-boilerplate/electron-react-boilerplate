import { connect } from 'react-redux';
import Counter from './Counter';
import { counterActions } from './counterSlice';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

export default connect(mapStateToProps, counterActions)(Counter);
