import { useRoute } from 'hooks';

export function useHook() {
  const { navigate } = useRoute();

  function navigateToDashboard() {
    navigate({ path: '/' });
  }

  return {
    navigateToDashboard,
  };
}
