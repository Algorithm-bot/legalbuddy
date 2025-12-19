/**
 * VIEW LAYER - GeneratedDocument.jsx
 * 
 * Responsibility: Display the generated document to user
 * This is a View because it:
 * 1. Only handles UI rendering
 * 2. Receives data from Controller via navigation state
 * 3. Provides UI actions (copy, download) without business logic
 * 4. Calls Controller to save document to backend
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { saveDocumentToBackend } from '../controllers/DocumentController';
import '../styles/GeneratedDocument.css';

const GeneratedDocument = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const generatedDoc = location.state?.document; // Renamed to avoid conflict with DOM document
  const fromMyDocuments = location.state?.fromMyDocuments || false;
  const formData = location.state?.formData; // Original form data
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Save document to backend when component loads (if it's a new document)
  useEffect(() => {
    // Only save if:
    // 1. User is authenticated
    // 2. Document exists
    // 3. Not coming from My Documents (already saved)
    // 4. Has document type (required for saving)
    if (user && generatedDoc && !fromMyDocuments && generatedDoc.type) {
      const saveToBackend = async () => {
        try {
          setSaving(true);
          setSaveError(null);
          
          // Call Controller to save document
          const result = await saveDocumentToBackend(
            generatedDoc.type,
            generatedDoc.content,
            formData || {}
          );
          
          if (result.success) {
            setSaved(true);
          } else {
            setSaveError(result.error || 'Failed to save document');
          }
        } catch (error) {
          console.error('Error saving document:', error);
          setSaveError(error.message || 'Failed to save document');
        } finally {
          setSaving(false);
        }
      };

      saveToBackend();
    }
  }, [user, generatedDoc, fromMyDocuments, formData]);

  // If no document in state, redirect to document selection
  if (!generatedDoc) {
    navigate('/documents');
    return null;
  }

  // VIEW: Handle copy to clipboard - pure UI action
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedDoc.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy document. Please select and copy manually.');
    }
  };

  // VIEW: Handle download - pure UI action
  const handleDownload = () => {
    const blob = new Blob([generatedDoc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); // DOM document object
    a.href = url;
    a.download = `${generatedDoc.title}_${new Date().getTime()}.txt`;
    document.body.appendChild(a); // DOM document object
    a.click();
    document.body.removeChild(a); // DOM document object
    URL.revokeObjectURL(url);
  };

  return (
    <div className="generated-document-container">
      <header className="page-header">
        <h1>{generatedDoc.title}</h1>
        <p>Your document has been generated successfully</p>
        {/* Show save status */}
        {user && !fromMyDocuments && (
          <div style={{ marginTop: '10px' }}>
            {saving && <p style={{ color: '#666' }}>💾 Saving document...</p>}
            {saved && <p style={{ color: '#4caf50' }}>✅ Document saved to your account</p>}
            {saveError && <p style={{ color: '#f44336' }}>⚠️ {saveError}</p>}
          </div>
        )}
      </header>

      <div className="document-actions">
        <button onClick={handleCopy} className={`action-button ${copied ? 'copied' : ''}`}>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button onClick={handleDownload} className="action-button">
          Download as .txt
        </button>
        <button onClick={() => navigate('/documents')} className="action-button secondary">
          Generate Another
        </button>
      </div>

      <div className="document-preview">
        <div className="document-content">
          <pre>{generatedDoc.content}</pre>
        </div>
      </div>

      <div className="navigation-links">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
        {user && (
          <button onClick={() => navigate('/my-documents')} className="back-button">
            📄 My Documents
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneratedDocument;
