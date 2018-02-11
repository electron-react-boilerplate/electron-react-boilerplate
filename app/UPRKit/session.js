import Axios from 'axios';
import { API_ADDRESS } from './index';

export function joinSession(token: string) {
  return Axios.get(`${API_ADDRESS}/JoinSession`, { params: { token } });
}

export default {
  joinSession
};
