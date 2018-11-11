import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import LanguageProvider from '../components/LanguageProvider';
import * as LanguageProviderActions from '../actions/language';
import { makeSelectLocale } from '../selectors/language';

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LanguageProviderActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageProvider);
