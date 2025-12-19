/**
 * VIEW LAYER - DocumentForm.jsx
 * 
 * Responsibility: Display form for user input based on document type
 * This is a View because it:
 * 1. Only handles UI rendering and user input
 * 2. Calls Controller to validate and generate document
 * 3. Does not contain business logic
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocumentFields, handleDocumentGeneration, validateField } from '../controllers/DocumentController';
import '../styles/DocumentForm.css';

const DocumentForm = () => {
  const { documentType } = useParams();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // VIEW: Call Controller to get required fields when component loads
  useEffect(() => {
    const fields = getDocumentFields(documentType);
    if (fields) {
      setFormFields(fields);
      // Initialize form data with empty values
      const initialData = {};
      fields.fields.forEach(field => {
        initialData[field] = '';
      });
      setFormData(initialData);
    } else {
      navigate('/documents');
    }
    setLoading(false);
  }, [documentType, navigate]);

  // VIEW: Handle input change - update form state
  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // VIEW: Call Controller for real-time validation
    const validation = validateField(fieldName, value);
    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: validation.message
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // VIEW: Handle form submission - call Controller to generate document
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // VIEW: Call Controller method to handle document generation
    const result = handleDocumentGeneration(documentType, formData);
    
    if (result.success) {
      // Navigate to display generated document
      // Pass both document and formData so it can be saved to backend
      navigate(`/documents/${documentType}/generated`, {
        state: { 
          document: {
            ...result.document,
            type: documentType // Add document type for saving
          },
          formData: formData // Pass original form data for saving
        }
      });
    } else {
      // Display errors from Controller
      setErrors(result.errors || {});
    }
  };

  // Helper function to format field labels
  const formatFieldLabel = (fieldName) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Helper function to get icon for field type
  const getFieldIcon = (fieldName) => {
    const lowerField = fieldName.toLowerCase();
    if (lowerField.includes('name')) return 'fa-user';
    if (lowerField.includes('email')) return 'fa-envelope';
    if (lowerField.includes('address')) return 'fa-map-marker-alt';
    if (lowerField.includes('phone')) return 'fa-phone';
    if (lowerField.includes('date')) return 'fa-calendar';
    if (lowerField.includes('amount') || lowerField.includes('price') || lowerField.includes('rent')) return 'fa-dollar-sign';
    if (lowerField.includes('description') || lowerField.includes('details')) return 'fa-align-left';
    return 'fa-edit';
  };

  if (loading || !formFields) {
    return <div className="loading">Loading form...</div>;
  }

  return (
    <div className="document-form-container">
      <header className="page-header">
        <h1>{formFields.title}</h1>
        <p>{formFields.description}</p>
      </header>

      <form onSubmit={handleSubmit} className="document-form">
        {formFields.fields.map((field) => (
          <div key={field} className={`form-group ${formData[field] && !errors[field] ? 'success' : ''}`}>
            <label htmlFor={field}>
              {formatFieldLabel(field)} <span className="required">*</span>
            </label>
            <i className={`fas ${getFieldIcon(field)}`}></i>
            <input
              type="text"
              id={field}
              value={formData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={errors[field] ? 'error' : ''}
              placeholder={`Enter ${formatFieldLabel(field).toLowerCase()}`}
            />
            {errors[field] && (
              <span className="error-message">{errors[field]}</span>
            )}
          </div>
        ))}

        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/documents')} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Generate Document
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentForm;
