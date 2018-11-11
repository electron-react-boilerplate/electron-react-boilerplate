import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectModules } from '../selectors/global';
import Home from '../components/Home';

export const mapStateToProps = createStructuredSelector({
  modules: makeSelectModules(),
});

export default connect(
  mapStateToProps,
  null,
)(Home);
