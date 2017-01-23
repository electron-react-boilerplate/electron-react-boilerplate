// @flow
import { connect } from 'react-redux';
import Explorer from '../components/Explorer';
import jesFtp from '../utils/jesFtp';

function mapStateToProps(state) {
  return {
    datasets: state.datasets,
    theme: state.uiStyle.theme,
    color: state.uiStyle.color,
    explorerContent: state.explorer.explorerContent
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEditorContent: (newValue) => dispatch(setEditorContent(newValue)),
    retrieveMember: (dsName, memberName) => jesFtp.retrieveMember(dsName, memberName)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Explorer);