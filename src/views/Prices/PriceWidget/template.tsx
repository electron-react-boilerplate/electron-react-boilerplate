import { Coin } from 'types';

export function PriceWidget({ list }: { list: Coin[] }) {
  if (!list) {
    return null;
  }
  return (
    <div>
      {list.map(({ price, symbol }) => (
        <div key={symbol}>{`${symbol}:${price}`}</div>
      ))}
    </div>
  );
}
