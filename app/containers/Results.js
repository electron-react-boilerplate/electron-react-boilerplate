// @flow
import { connect } from 'react-redux';
import Results from '../components/Results';
import { setEditorContent } from '../actions/editor';
import jes from '../utils/jesFtp';

const {dialog} = require('electron').remote;

function mapStateToProps(state) {
  return {
    jobs: state.jobs,
    theme: state.uiStyle.theme,
    color: state.uiStyle.color,
    isConnected: state.results.isConnected
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteJob: (jobID) => {
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Cancel', 'Delete'],
        defaultId: 0,
        title: 'Confirm deletion',
        message: `Are you sure that you want to delete ${jobID} from the mainframes job entry subsystem?. This is irreversible.`,
        noLink: true
      },
        (response) => {
          console.log("Button chosed was:", response);
          if (response === 1) {
            console.log("Delete was confirmed");
            // dispatch(jes.deleteJob(jobID));
            jes.deleteJob(jobID); // jes.deleteJob has a dispatch statement in it.
          }
        })
    },
    retrieveJob: (jobID) => {
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Cancel', 'Download'],
        defaultId: 0,
        title: 'Confirm download',
        message: `Are you sure that you want to download ${jobID}.`,
        noLink: true
      },
        (response) => {
          console.log("Button chosed was:", response);
          if (response === 1) {
            console.log("Dowload was confirmed");
            jes.retrieveJob(jobID) // jes.retrieveJob has a dispatch statement in it.
          }
        })
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Results);