import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UseInactivityRedirectProps = {
  timeoutDuration?: number; // Optional timeout duration in milliseconds
};

function useInactivityRedirect({
  timeoutDuration = 60000,
}: UseInactivityRedirectProps = {}) {
  const navigate = useNavigate();
  const [inactive, setInactive] = useState<boolean>(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setInactive(true);
      }, timeoutDuration);
    };

    const handleActivity = () => {
      setInactive(false);
      resetTimeout();
    };

    // Attach event listeners for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity); // For touch screens
    window.addEventListener('touchmove', handleActivity); // For touch screens

    resetTimeout(); // Initialize the timeout on mount

    return () => {
      // Clean up event listeners and timeout on unmount
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity); // For touch screens
      window.removeEventListener('touchmove', handleActivity); // For touch screens
    };
  }, [timeoutDuration]);

  useEffect(() => {
    if (inactive) {
      navigate('/'); // Redirect to the home page
    }
  }, [inactive, navigate]);
}

export default useInactivityRedirect;
