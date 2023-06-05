import { Button } from 'ui';
import { useHook } from './hook';

export function History() {
  const { navigateToDashboard } = useHook();

  return (
    <div>
      <h2>Trade history page</h2>
      <Button onClick={navigateToDashboard}>Dashboard</Button>
    </div>
  );
}
