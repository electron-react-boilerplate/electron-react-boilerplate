import { AxiosInstance } from './index';

export function joinSession(token: string) {
  return AxiosInstance.get('/JoinSession', { params: { token } });
}

export default {
  joinSession
};
