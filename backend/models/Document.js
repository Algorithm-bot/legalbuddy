/**
 * DOCUMENT MODEL - Document.js
 * 
 * Responsibility: Define MongoDB schema for legal documents
 * 
 * Architecture:
 * - This is the Model layer (MVC pattern)
 * - Defines data structure and validation rules
 * - Uses Mongoose for MongoDB interaction
 * 
 * Schema Fields:
 * - firebaseUid: Links document to Firebase-authenticated user (indexed for fast queries)
 * - documentType: Type of legal document (e.g., "affidavit", "rental-agreement")
 * - content: The generated document content (full text)
 * - formData: Original user input that was used to generate the document
 * - createdAt: Timestamp when document was created (auto-generated)
 * 
 * Why Firebase UID?
 * - Firebase UID is the unique identifier for authenticated users
 * - It's secure and cannot be spoofed (validated server-side)
 * - Allows querying documents by user: "Get all documents where firebaseUid = current user's UID"
 */

import mongoose from 'mongoose';

/**
 * Document Schema
 * Defines the structure of documents stored in MongoDB
 */
const documentSchema = new mongoose.Schema(
  {
    // Firebase UID - Links document to authenticated user
    // Required: Every document must belong to a user
    // Indexed: For fast queries when fetching user's documents
    firebaseUid: {
      type: String,
      required: [true, 'Firebase UID is required to link document to user'],
      index: true, // Create index for faster queries
      trim: true,
    },

    // Document type - e.g., "affidavit", "rental-agreement", "nda"
    documentType: {
      type: String,
      required: [true, 'Document type is required'],
      trim: true,
    },

    // Generated document content - The full text of the legal document
    content: {
      type: String,
      required: [true, 'Document content is required'],
    },

    // Form data - Original user input used to generate the document
    // Stored as Object to preserve all form fields and values
    // Useful for:
    // - Re-generating documents with same data
    // - Showing what user entered
    // - Analytics and debugging
    formData: {
      type: mongoose.Schema.Types.Mixed, // Allows any object structure
      required: [true, 'Form data is required'],
    },

    // Creation timestamp - Automatically set when document is created
    createdAt: {
      type: Date,
      default: Date.now, // Auto-generate timestamp
      index: true, // Indexed for sorting by date
    },
  },
  {
    // Schema options
    timestamps: false, // We're using custom createdAt, so disable auto timestamps
    collection: 'documents', // Explicit collection name
  }
);

// Index for efficient queries: Get user's documents sorted by creation date
// Compound index on firebaseUid and createdAt for fast user-specific queries
documentSchema.index({ firebaseUid: 1, createdAt: -1 });

/**
 * Document Model
 * Exported for use in controllers
 */
const Document = mongoose.model('Document', documentSchema);

export default Document;
