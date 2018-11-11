import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LanguageProvider from '../components/LanguageProvider';
import * as LanguageProviderActions from '../actions/counter';

function mapStateToProps(state) {
  console.log('FGDFGFDGDF', { ...state });
  return {
    locale: state.language.get('locale')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LanguageProviderActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageProvider);
