/**
 * MODEL LAYER - DocumentModel.js
 * 
 * Responsibility: Contains business logic for document generation
 * This is a Model because it:
 * 1. Contains business logic (document generation, placeholder replacement)
 * 2. Has no UI dependencies
 * 3. Can be tested independently
 * 4. Processes data according to business rules
 */

import { getTemplate } from './TemplateModel.js';

/**
 * Replace placeholders in template with actual values
 * This is business logic - it processes data according to rules
 * @param {string} template - Template string with placeholders like {{name}}
 * @param {object} data - Object containing values to replace placeholders
 * @returns {string} Generated document with placeholders replaced
 */
export const replacePlaceholders = (template, data) => {
  let generatedDocument = template;
  
  // Replace all placeholders in the format {{placeholderName}}
  Object.keys(data).forEach(key => {
    const placeholder = `{{${key}}}`;
    const value = data[key] || '';
    // Replace all occurrences of the placeholder
    generatedDocument = generatedDocument.replace(
      new RegExp(placeholder, 'g'), 
      value
    );
  });
  
  return generatedDocument;
};

/**
 * Generate a legal document based on type and user input
 * This is the main business logic method for document generation
 * @param {string} documentType - Type of document to generate
 * @param {object} formData - User input data
 * @returns {object} Object containing generated document and metadata
 */
export const generateDocument = (documentType, formData) => {
  // Get template from TemplateModel
  const templateObj = getTemplate(documentType);
  
  if (!templateObj) {
    throw new Error(`Document type "${documentType}" not found`);
  }
  
  // Use business logic to replace placeholders
  const generatedContent = replacePlaceholders(templateObj.template, formData);
  
  return {
    title: templateObj.title,
    type: documentType,
    content: generatedContent,
    generatedAt: new Date().toISOString()
  };
};

/**
 * Validate form data based on document type
 * Business logic for validation rules
 * @param {string} documentType - Type of document
 * @param {object} formData - Data to validate
 * @returns {object} Validation result with isValid and errors
 */
export const validateFormData = (documentType, formData) => {
  const errors = {};
  
  // Basic validation - check for empty required fields
  if (!formData || Object.keys(formData).length === 0) {
    return {
      isValid: false,
      errors: { general: 'Please fill in all required fields' }
    };
  }
  
  // Check for empty values in form data
  Object.keys(formData).forEach(key => {
    if (!formData[key] || formData[key].trim() === '') {
      errors[key] = `${key} is required`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
