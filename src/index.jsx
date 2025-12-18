/**
 * index.jsx - Entry Point
 * 
 * This is the entry point of the React application
 * It renders the App component which contains all routing and MVC structure
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './AuthContext.jsx';

// Render the App component to the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
