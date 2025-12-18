/**
 * CONTROLLER LAYER - AuthController.js
 *
 * Responsibility: Handle authentication flows and coordinate between Views and Firebase.
 * This is a Controller because it:
 * - Exposes use-case style methods (signInWithGoogle, signOut, subscribeToAuthChanges)
 * - Talks to infrastructure (FirebaseConfig) but not to React components directly
 */

import { auth, googleProvider } from '../FirebaseConfig';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

/**
 * Sign in with Google using a popup window.
 * Called by Views (e.g., navbar) through this Controller.
 */
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  // You can adapt this to map the user into a domain model if needed
  return result.user;
};

/**
 * Sign out the currently authenticated user.
 */
export const signOutUser = async () => {
  await signOut(auth);
};

/**
 * Subscribe to authentication state changes.
 *
 * @param {function} callback - Receives the current user (or null) whenever it changes.
 * @returns {function} unsubscribe function.
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
