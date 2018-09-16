import Axios from 'axios';
import Package from '../package.json';
import Session from './session';
import Utils from './utils';

export const AxiosInstance = Axios.create({
  baseURL: 'https://universalpresenterremote.com',
  headers: {
    upr_version: Package.version,
    upr_platform: process.platform
  }
});

export default {
  Session,
  Utils
};
