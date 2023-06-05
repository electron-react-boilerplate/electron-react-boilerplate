import { useHook } from './hook';
import { PriceWidget } from './PriceWidget';

export function Prices() {
  const { list } = useHook();

  return <PriceWidget list={list} />;
}
