import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    // Check if user is there and change logged in status
    if (user) setLoggedIn(true);
    else setLoggedIn(false);

    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};
