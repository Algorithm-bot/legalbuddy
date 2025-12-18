/**
 * FirebaseConfig.js
 *
 * Responsibility: Initialize and expose Firebase services (infrastructure layer).
 * This file does NOT contain any React or UI logic.
 * Controllers can import these exports to call Firebase.
 */

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// IMPORTANT:
// Replace the placeholder values below with your actual Firebase project config.
// For clean architecture and easier environment management with Vite,
// you can also move these to environment variables (VITE_FIREBASE_...).
// Example:
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCU94fj-LhxMXABsgGZZXsIHUl_Lhht_lU',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'legalhelpbuddy.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'legalhelpbuddy',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'legalhelpbuddy.firebasestorage.app',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '488567035432',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:488567035432:web:1234567890abcdef123456',
};

// Initialize Firebase app (singleton)
const app = initializeApp(firebaseConfig);

// Auth service and Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
