// @flow
import { connect } from 'react-redux';
import JobsTree from '../components/jobsTree';
import { setEditorContent } from '../actions/editor';
import jes from '../utils/jesFtp';

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteJob: (jobID) => {
      dispatch(jes.deleteJob(jobID));
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(JobsTree);