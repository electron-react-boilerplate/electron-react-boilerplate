import { SET_HOST_NAME, SET_FTP_PORT, SET_FTP_USER_NAME, SET_FTP_PASSWORD } from '../constants';

const initialConfigState = {
  hostName: '',
  ftpPort: '23',
  ftpUserName: '',
  ftpPassword: ''
};

export default function (state = initialConfigState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_HOST_NAME:
      newState.hostName = action.hostName;
      break;
    case SET_FTP_PORT:
      newState.ftpPort = action.ftpPort;
      break;
    case SET_FTP_USER_NAME:
      newState.ftpUserName = action.ftpUserName;
      break;
    case SET_FTP_PASSWORD:
      newState.ftpPassword = action.ftpPassword;
      break;
    default:
      return state;
  }
  return newState;
}