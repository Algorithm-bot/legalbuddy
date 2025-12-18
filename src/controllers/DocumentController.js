/**
 * CONTROLLER LAYER - DocumentController.js
 * 
 * Responsibility: Handle user actions, validate input, coordinate between View and Model
 * This is a Controller because it:
 * 1. Handles user interactions and events
 * 2. Validates user input before passing to Model
 * 3. Calls Model methods to perform business logic
 * 4. Returns processed data to View
 * 5. Acts as intermediary between View and Model (MVC pattern)
 */

import { generateDocument, validateFormData } from '../models/DocumentModel.js';
import { getAllDocumentMetadata, getTemplate } from '../models/TemplateModel.js';

/**
 * Controller method to handle document generation request
 * Flow: View → Controller → Model → Controller → View
 * @param {string} documentType - Type of document selected by user
 * @param {object} formData - User input from form
 * @returns {object} Result object with success status, document, or errors
 */
export const handleDocumentGeneration = (documentType, formData) => {
  try {
    // CONTROLLER: Validate input before passing to Model
    const validation = validateFormData(documentType, formData);
    
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        document: null
      };
    }
    
    // CONTROLLER: Call Model method to perform business logic
    const generatedDocument = generateDocument(documentType, formData);
    
    // CONTROLLER: Return processed data to View
    return {
      success: true,
      document: generatedDocument,
      errors: null
    };
  } catch (error) {
    // CONTROLLER: Handle errors and return to View
    return {
      success: false,
      errors: { general: error.message },
      document: null
    };
  }
};

/**
 * Controller method to get all available document types
 * Acts as a bridge between View and Model
 * @returns {array} Array of document metadata
 */
export const getAllDocuments = () => {
  return getAllDocumentMetadata();
};

/**
 * Controller method to get required fields for a document type
 * Used by View to render appropriate form fields
 * @param {string} documentType - Type of document
 * @returns {object} Template object with required placeholders
 */
export const getDocumentFields = (documentType) => {
  const template = getTemplate(documentType);
  
  if (!template) {
    return null;
  }
  
  // Extract field names from placeholders in template
  const placeholderRegex = /\{\{(\w+)\}\}/g;
  const fields = [];
  let match;
  
  while ((match = placeholderRegex.exec(template.template)) !== null) {
    if (!fields.includes(match[1])) {
      fields.push(match[1]);
    }
  }
  
  return {
    fields,
    title: template.title,
    description: template.description
  };
};

/**
 * Controller method to validate form input in real-time
 * Called by View during user input for immediate feedback
 * @param {string} fieldName - Name of the field being validated
 * @param {string} value - Value entered by user
 * @returns {object} Validation result for the field
 */
export const validateField = (fieldName, value) => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      message: `${fieldName} is required`
    };
  }
  
  return {
    isValid: true,
    message: ''
  };
};
