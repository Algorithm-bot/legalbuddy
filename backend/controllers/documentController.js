/**
 * DOCUMENT CONTROLLER - documentController.js
 * 
 * Responsibility: Handle business logic for document operations
 * 
 * Architecture:
 * - This is the Controller layer (MVC pattern)
 * - Receives requests from routes
 * - Interacts with Model (Document) to perform database operations
 * - Returns responses to routes
 * 
 * Security:
 * - Uses req.uid from Firebase auth middleware
 * - Only allows users to access their own documents
 * - Never trusts client-provided UID (validated by middleware)
 * 
 * Controller Methods:
 * - saveDocument: Save a newly generated document to database
 * - getUserDocuments: Fetch all documents for the authenticated user
 */

import Document from '../models/Document.js';

/**
 * Save a generated document to MongoDB
 * 
 * Flow:
 * 1. Receive document data from request body
 * 2. Extract Firebase UID from req.uid (set by auth middleware)
 * 3. Create new Document instance with user's UID
 * 4. Save to database
 * 5. Return success response with saved document
 * 
 * Security:
 * - Uses req.uid from middleware (cannot be spoofed)
 * - Ensures document is linked to authenticated user
 * 
 * @param {Object} req - Express request object (contains req.uid from middleware)
 * @param {Object} res - Express response object
 */
export const saveDocument = async (req, res) => {
  try {
    // Extract UID from request (set by firebaseAuth middleware)
    // In demo mode: uses "demo-user"
    // In Firebase mode: uses verified Firebase UID
    const firebaseUid = req.uid || 'demo-user';

    // Extract document data from request body
    const { documentType, content, formData } = req.body;

    // Validate required fields
    if (!documentType || !content || !formData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: documentType, content, and formData are required',
      });
    }

    // Create new document instance
    // firebaseUid is set from req.uid (not from request body - security!)
    const newDocument = new Document({
      firebaseUid, // From authenticated user (req.uid)
      documentType,
      content,
      formData,
      createdAt: new Date(), // Explicit timestamp
    });

    // Save to MongoDB
    console.log(`💾 Attempting to save document for user: ${firebaseUid}`);
    console.log(`📄 Document type: ${documentType}`);
    
    const savedDocument = await newDocument.save();

    console.log(`✅ Document saved successfully with ID: ${savedDocument._id}`);

    // Return success response
    // Exclude MongoDB internal fields (_id, __v) for cleaner response
    res.status(201).json({
      success: true,
      message: 'Document saved successfully',
      document: {
        id: savedDocument._id,
        documentType: savedDocument.documentType,
        createdAt: savedDocument.createdAt,
      },
    });
  } catch (error) {
    console.error('❌ Error saving document:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error: ' + error.message,
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Internal server error: Failed to save document',
    });
  }
};

/**
 * Get all documents for the authenticated user
 * 
 * Flow:
 * 1. Extract Firebase UID from req.uid (set by auth middleware)
 * 2. Query database for documents matching user's UID
 * 3. Sort by creation date (newest first)
 * 4. Return documents as JSON array
 * 
 * Security:
 * - Only returns documents where firebaseUid matches req.uid
 * - User cannot access other users' documents
 * - Uses req.uid from middleware (cannot be spoofed)
 * 
 * @param {Object} req - Express request object (contains req.uid from middleware)
 * @param {Object} res - Express response object
 */
export const getUserDocuments = async (req, res) => {
  try {
    // Extract UID from request (set by firebaseAuth middleware)
    // In demo mode: uses "demo-user"
    // In Firebase mode: uses verified Firebase UID
    const firebaseUid = req.uid || 'demo-user';

    // Query database for user's documents
    // Only fetch documents where firebaseUid matches authenticated user's UID
    // Sort by createdAt descending (newest first)
    const documents = await Document.find({ firebaseUid })
      .sort({ createdAt: -1 }) // -1 = descending (newest first)
      .select('-__v') // Exclude MongoDB version field
      .lean(); // Return plain JavaScript objects (faster, no Mongoose methods)

    // Return success response with documents array
    res.status(200).json({
      success: true,
      count: documents.length,
      documents: documents.map((doc) => ({
        id: doc._id,
        documentType: doc.documentType,
        content: doc.content,
        formData: doc.formData,
        createdAt: doc.createdAt,
      })),
    });
  } catch (error) {
    console.error('❌ Error fetching user documents:', error);

    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Internal server error: Failed to fetch documents',
    });
  }
};
