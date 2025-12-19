/**
 * EXPRESS SERVER - server.js
 * 
 * Responsibility: Main entry point for backend API server
 * 
 * Architecture:
 * - Sets up Express application
 * - Connects to MongoDB database
 * - Registers routes and middleware
 * - Starts HTTP server
 * 
 * Flow:
 * 1. Load environment variables
 * 2. Connect to MongoDB
 * 3. Configure Express middleware (CORS, JSON parsing)
 * 4. Register API routes
 * 5. Start server on specified port
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import documentRoutes from './routes/documentRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();

// Get port from environment variable or use default
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================

// CORS (Cross-Origin Resource Sharing)
// Allows frontend (React app) to make requests to backend
// In production, specify exact origin instead of '*'
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default port
    credentials: true, // Allow cookies/credentials
  })
);

// Parse JSON request bodies
// Allows Express to automatically parse JSON data from request body
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================

// Health check endpoint (no authentication required)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'LegalHelpBuddy API is running',
    timestamp: new Date().toISOString(),
  });
});

// Document routes (protected with Firebase auth)
// All routes under /api/documents require authentication
app.use('/api/documents', documentRoutes);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// ==================== ERROR HANDLING ====================

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ==================== START SERVER ====================

/**
 * Initialize server
 * 1. Connect to MongoDB
 * 2. Start Express server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB database
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
      console.log(`📄 Documents API: http://localhost:${PORT}/api/documents`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
