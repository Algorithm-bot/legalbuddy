/**
 * VIEW LAYER - GeneratedDocument.jsx
 * 
 * Responsibility: Display the generated document to user
 * This is a View because it:
 * 1. Only handles UI rendering
 * 2. Receives data from Controller via navigation state
 * 3. Provides UI actions (copy, download) without business logic
 */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/GeneratedDocument.css';

const GeneratedDocument = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const document = location.state?.document;
  const [copied, setCopied] = useState(false);

  // If no document in state, redirect to document selection
  if (!document) {
    navigate('/documents');
    return null;
  }

  // VIEW: Handle copy to clipboard - pure UI action
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(document.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy document. Please select and copy manually.');
    }
  };

  // VIEW: Handle download - pure UI action
  const handleDownload = () => {
    const blob = new Blob([document.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.title}_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="generated-document-container">
      <header className="page-header">
        <h1>{document.title}</h1>
        <p>Your document has been generated successfully</p>
      </header>

      <div className="document-actions">
        <button onClick={handleCopy} className="action-button">
          {copied ? '✓ Copied!' : 'Copy to Clipboard'}
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
          <pre>{document.content}</pre>
        </div>
      </div>

      <div className="navigation-links">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default GeneratedDocument;
