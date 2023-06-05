import { useNavigate } from 'react-router-dom';

export function useRoute() {
  const route = useNavigate();

  function navigate({ path }: { path: string }) {
    route(path);
  }

  return {
    navigate,
  };
}
