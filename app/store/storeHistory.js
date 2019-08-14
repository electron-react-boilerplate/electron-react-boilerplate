import { createHashHistory } from 'history';

export default function getHistory(scope: string = 'main') {
  let history = null;

  if (scope === 'renderer') {
    history = createHashHistory();
  }

  return history;
}
