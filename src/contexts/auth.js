import { createContext, useState, useEffect, useCallback } from 'react';

import api from '../services/api';
import { sleep } from '../utils';
import { logInService, logUpService } from '../services/auth';

import { useLocalStorage } from '../hooks';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storageUser, setStorageUser] = useLocalStorage('@petmanager:user');
  const [storageToken, setStorageToken] = useLocalStorage('@petmanager:token');

  useEffect(() => {
    setLoading(true);
    if (storageUser && storageToken) {
      setUser(storageUser);
      api.defaults.headers.Authorization = `Baerer ${storageToken}`;
    }
    setLoading(false);
  }, [user, storageUser, storageToken]);

  const logIn = useCallback(
    async ({ username, password }) => {
      setLoading(true);
      setError(null);
      try {
        const { user, token } = await logInService({ username, password });
        setUser(user);
        api.defaults.headers.Authorization = `Baerer ${token}`;
        setStorageUser(user);
        setStorageToken(token);
      } catch (err) {
        setError(err.response);
      } finally {
        setLoading(false);
      }
    },
    [setStorageUser, setStorageToken]
  );

  const logUp = useCallback(
    async ({ name, username, password }) => {
      setLoading(true);
      setError(null);
      try {
        await logUpService({ name, username, password });

        logIn({ username, password });
      } catch (err) {
        setError(err.response);
        setLoading(false);
      }
    },
    [logIn]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    await sleep();
    setError(null);
    setStorageUser(null);
    setStorageToken(null);
    setUser(null);
    setLoading(false);
  }, [setStorageUser, setStorageToken]);

  const isUserSignedIn = !!user;
  const isUserAdmin = user?.is_admin;

  return (
    <AuthContext.Provider
      value={{
        isUserSignedIn,
        isUserAdmin,
        user,
        logIn,
        logUp,
        signOut,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
