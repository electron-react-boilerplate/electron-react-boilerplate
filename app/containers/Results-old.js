// @flow
import { connect } from 'react-redux';
import Results from '../components/Results';

function mapStateToProps(state) {
  return {
    resultsContent: state.results.resultsContent,
    theme: state.uiStyle.theme,
    color: state.uiStyle.color
  };
}

export default connect(mapStateToProps)(Results);