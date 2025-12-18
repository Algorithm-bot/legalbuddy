/**
 * APP.jsx - Main Application Component
 * 
 * This file integrates MVC architecture with React Router
 * MVC Flow: User Action → View → Controller → Model → Controller → View
 * 
 * Architecture Explanation:
 * - Views: React components in src/views/ (Home, DocumentSelection, etc.)
 * - Controllers: Functions in src/controllers/ (handleDocumentGeneration, etc.)
 * - Models: Business logic in src/models/ (DocumentModel, TemplateModel)
 * 
 * This App component:
 * 1. Sets up routing to connect Views
 * 2. Views call Controllers when user interacts
 * 3. Controllers call Models to perform business logic
 * 4. Models return data to Controllers
 * 5. Controllers return data to Views for display
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// VIEW Components - Pure UI, no business logic
import Home from './views/Home';
import DocumentSelection from './views/DocumentSelection';
import DocumentForm from './views/DocumentForm';
import GeneratedDocument from './views/GeneratedDocument';
import LegalGuides from './views/LegalGuides';

// Global styles
import './styles/App.css';

// VIEW: Application-wide Material UI theme (law-inspired palette)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1b325f', // deep navy blue
    },
    secondary: {
      main: '#c79a3b', // warm gold
    },
    background: {
      default: '#f5f7fa',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* VIEW: Normalize browser styles and apply MUI base styles */}
      <CssBaseline />
      <Router>
        <div className="app">
          <Routes>
            {/* Route to Home View */}
            <Route path="/" element={<Home />} />

            {/* Route to Document Selection View */}
            <Route path="/documents" element={<DocumentSelection />} />

            {/* Route to Document Form View - User fills form here */}
            <Route path="/documents/:documentType/form" element={<DocumentForm />} />

            {/* Route to Generated Document View - Shows result after Controller processes */}
            <Route path="/documents/:documentType/generated" element={<GeneratedDocument />} />

            {/* Route to Legal Guides View */}
            <Route path="/guides" element={<LegalGuides />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
