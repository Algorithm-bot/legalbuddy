/**
 * DOCUMENT SERVICE - documentService.js
 * 
 * Responsibility: Handle API communication with backend for document operations
 * 
 * Architecture:
 * - This is the service layer (data access layer)
 * - Abstracts API calls from controllers and views
 * - Handles authentication token management
 * - Provides clean interface for document operations
 * 
 * Methods:
 * - saveDocument: Save a generated document to backend
 * - getUserDocuments: Fetch all documents for current user
 * 
 * Authentication:
 * - Gets Firebase ID token from current user
 * - Attaches token to Authorization header
 * - Backend validates token and extracts UID
 */

import { auth } from '../FirebaseConfig.js';

// Backend API base URL
// In production, use environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get Firebase ID token for current user (OPTIONAL for demo)
 * This token is used to authenticate API requests
 * 
 * DEMO MODE: If user is not signed in, returns null
 * Backend will use "demo-user" ID when no token is provided
 * 
 * @returns {Promise<string|null>} Firebase ID token or null if not authenticated
 */
const getAuthToken = async () => {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      // Demo mode: No user signed in, backend will use demo-user
      console.log('ℹ️  No user signed in - using demo mode');
      return null;
    }

    // Get ID token from Firebase
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    // If token retrieval fails, use demo mode
    console.warn('⚠️  Could not get auth token, using demo mode:', error.message);
    return null;
  }
};

/**
 * Save a generated document to backend MongoDB
 * 
 * Flow:
 * 1. Get Firebase ID token
 * 2. Send POST request to /api/documents with document data
 * 3. Include Authorization header with Bearer token
 * 4. Return response from backend
 * 
 * @param {string} documentType - Type of document (e.g., "affidavit")
 * @param {string} content - Generated document content
 * @param {object} formData - Original user input form data
 * @returns {Promise<object>} Response from backend
 */
export const saveDocument = async (documentType, content, formData) => {
  try {
    // Get authentication token (optional - null in demo mode)
    const token = await getAuthToken();

    // Prepare headers
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header only if token is available
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Make API request to save document
    const response = await fetch(`${API_BASE_URL}/documents`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        documentType,
        content,
        formData,
      }),
    });

    // Parse response
    const data = await response.json();

    // Handle errors
    if (!response.ok) {
      throw new Error(data.error || 'Failed to save document');
    }

    return data;
  } catch (error) {
    console.error('❌ Error saving document:', error);
    throw error;
  }
};

/**
 * Fetch all documents for the current authenticated user
 * 
 * Flow:
 * 1. Get Firebase ID token
 * 2. Send GET request to /api/documents
 * 3. Include Authorization header with Bearer token
 * 4. Backend returns only documents for this user (filtered by Firebase UID)
 * 5. Return documents array
 * 
 * @returns {Promise<Array>} Array of user's documents
 */
export const getUserDocuments = async () => {
  try {
    // Get authentication token (optional - null in demo mode)
    const token = await getAuthToken();

    // Prepare headers
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header only if token is available
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Make API request to fetch user's documents
    const response = await fetch(`${API_BASE_URL}/documents`, {
      method: 'GET',
      headers,
    });

    // Parse response
    const data = await response.json();

    // Handle errors
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch documents');
    }

    // Return documents array
    return data.documents || [];
  } catch (error) {
    console.error('❌ Error fetching documents:', error);
    throw error;
  }
};
