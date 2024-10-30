// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth as firebaseAuth } from '../firebase';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        setAuth({
          isAuthenticated: true,
          user,
          loading: false,
        });
      } else {
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

