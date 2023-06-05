import { useRoute } from 'hooks';

export function useHook() {
  const { navigate } = useRoute();

  return {
    navigate,
  };
}
