import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import injectSaga from '../utils/injectSaga';
import reducer from '../reducers/counter';
import saga from '../sagas/counter';
import injectReducer from '../utils/injectReducer';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';
import { makeSelectCounter } from '../selectors/counter';

const mapStateToProps = createSelector(
  makeSelectCounter(),
  counter => ({
    counter
  })
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export const withReducer = injectReducer({ key: 'counter', reducer });

export const withSaga = injectSaga({ key: 'counter', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Counter);
