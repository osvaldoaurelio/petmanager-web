import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialState = null) => {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    return storageValue ? JSON.parse(storageValue) : initialState;
  });

  useEffect(() => {
    if (state) {
      localStorage.setItem(key, JSON.stringify(state));
    } else {
      localStorage.removeItem(key);
    }
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
