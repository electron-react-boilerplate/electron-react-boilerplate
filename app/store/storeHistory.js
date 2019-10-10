import { createHashHistory } from 'history';

export default function getHistory(scope: string = 'main') {
  return scope === 'renderer' ? createHashHistory() : null;
}
