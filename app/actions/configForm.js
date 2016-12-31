import {SET_HOST_NAME, SET_FTP_PORT, SET_FTP_USER_NAME, SET_FTP_PASSWORD} from '../constants';

export const setHostName = hostName => ({
  type: SET_HOST_NAME,
  hostName
});

export const setFtpPort = ftpPort => ({
  type: SET_FTP_PORT,
  ftpPort
});

export const setFtpUserName = ftpUserName => ({
  type: SET_FTP_USER_NAME,
  ftpUserName
});

export const setFtpPassword = ftpPassword => ({
  type: SET_FTP_PASSWORD,
  ftpPassword
});
