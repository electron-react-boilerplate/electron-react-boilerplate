import { connect } from 'react-redux';
import ConfigForm from '../components/ConfigForm';
import { setHostName, setFtpPort, setFtpUserName, setFtpPassword } from '../actions/configForm.js';

function mapStateToProps(state) {
  console.log("mapStateToProps invoked");
  return {
    hostName: state.config.hostName,
    ftpPort: state.config.ftpPort,
    ftpUserName: state.config.ftpUserName,
    ftpPassword: state.config.ftpPassword
  };
}

function mapDispatchToProps(dispatch) {
  console.log("mapDispatchToProps invoked");
  return {
    setHostName: (hostName) => dispatch(setHostName(hostName)),
    setFtpPort: (ftpPort) => dispatch(setFtpPort(ftpPort)),
    setFtpUserName: (ftpUserName) => dispatch(setFtpUserName(ftpUserName)),
    setFtpPassword: (ftpPassword) => dispatch(setFtpPassword(ftpPassword))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigForm);