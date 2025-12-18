/**
 * AuthContext.jsx
 *
 * Responsibility: Provide authenticated user state to Views.
 *
 * Architecture:
 * - Uses AuthController (Controller layer) to listen to Firebase auth changes.
 * - Exposes a simple React context and hook for Views to consume.
 * - Keeps Firebase details out of the View components.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithGoogle as controllerSignInWithGoogle,
  signOutUser as controllerSignOutUser,
  subscribeToAuthChanges,
} from './controllers/AuthController';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // CONTROLLER: Subscribe to auth state via AuthController
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser || null);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await controllerSignInWithGoogle();
  };

  const signOutUser = async () => {
    await controllerSignOutUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        signInWithGoogle,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
