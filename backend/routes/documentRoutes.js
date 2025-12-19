/**
 * DOCUMENT ROUTES - documentRoutes.js
 * 
 * Responsibility: Define API endpoints for document operations
 * 
 * Architecture:
 * - This is the routing layer
 * - Maps HTTP methods and paths to controller functions
 * - Protects routes with Firebase authentication middleware
 * 
 * Routes:
 * - POST /api/documents → Save a generated document (protected)
 * - GET /api/documents → Get all documents for authenticated user (protected)
 * 
 * Security:
 * - All routes use verifyFirebaseToken middleware
 * - Ensures only authenticated users can access endpoints
 * - Extracts and validates Firebase UID from token
 */

import express from 'express';
import { saveDocument, getUserDocuments } from '../controllers/documentController.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';

const router = express.Router();

/**
 * POST /api/documents
 * 
 * Save a newly generated document to MongoDB
 * 
 * Request Body:
 * {
 *   "documentType": "affidavit",
 *   "content": "Full document text...",
 *   "formData": { "field1": "value1", ... }
 * }
 * 
 * Headers:
 * Authorization: Bearer <firebase-id-token>
 * 
 * Response (201):
 * {
 *   "success": true,
 *   "message": "Document saved successfully",
 *   "document": { "id": "...", "documentType": "...", "createdAt": "..." }
 * }
 * 
 * Middleware:
 * - verifyFirebaseToken: Validates Firebase token and sets req.uid
 */
router.post('/', verifyFirebaseToken, saveDocument);

/**
 * GET /api/documents
 * 
 * Fetch all documents for the authenticated user
 * 
 * Headers:
 * Authorization: Bearer <firebase-id-token>
 * 
 * Response (200):
 * {
 *   "success": true,
 *   "count": 5,
 *   "documents": [
 *     {
 *       "id": "...",
 *       "documentType": "affidavit",
 *       "content": "...",
 *       "formData": {...},
 *       "createdAt": "..."
 *     },
 *     ...
 *   ]
 * }
 * 
 * Middleware:
 * - verifyFirebaseToken: Validates Firebase token and sets req.uid
 * 
 * Security:
 * - Only returns documents for the authenticated user (req.uid)
 */
router.get('/', verifyFirebaseToken, getUserDocuments);

export default router;
