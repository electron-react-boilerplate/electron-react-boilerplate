import { Prices } from './Prices';
import { History } from './History';
import { Hello } from './Hello';

export const views: [string, React.JSX.Element][] = [
  ['/', <Hello />],
  ['/prices', <Prices />],
  ['/history', <History />],
];
