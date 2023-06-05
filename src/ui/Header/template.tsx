import { Button } from 'ui';
import { useHook } from './hook';

export function Header() {
  const { navigate } = useHook();

  return (
    <div>
      <Button onClick={() => navigate({ path: '/' })}>Dashboard</Button>
      <Button onClick={() => navigate({ path: '/prices' })}>Prices</Button>
      <Button onClick={() => navigate({ path: '/history' })}>History</Button>
    </div>
  );
}
