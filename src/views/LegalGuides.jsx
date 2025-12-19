/**
 * VIEW LAYER - LegalGuides.jsx
 * 
 * Responsibility: Display legal guides and information
 * This is a View because it:
 * 1. Only handles UI rendering
 * 2. Displays static content
 * 3. No business logic involved
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LegalGuides.css';

const LegalGuides = () => {
  const navigate = useNavigate();

  const guides = [
    {
      title: 'What is an Affidavit?',
      content: `An affidavit is a written statement confirmed by oath or affirmation, used as evidence in court proceedings. It is a sworn statement of fact that you sign in the presence of an authorized person like a notary public.

Key Points:
- Must contain facts, not opinions
- Should be signed in the presence of a notary or authorized officer
- False statements can lead to perjury charges
- Used in various legal proceedings as evidence`
    },
    {
      title: 'Understanding Rental Agreements',
      content: `A rental agreement (also called lease agreement) is a contract between a landlord and tenant that outlines the terms and conditions for renting a property.

Important Elements:
- Duration of tenancy (lease term)
- Monthly rent amount and due date
- Security deposit amount
- Rights and responsibilities of both parties
- Property maintenance rules
- Conditions for termination

Always read the agreement carefully before signing and keep a copy for your records.`
    },
    {
      title: 'Non-Disclosure Agreements (NDA)',
      content: `An NDA is a legal contract that creates a confidential relationship between parties to protect sensitive information.

When to Use:
- Sharing business ideas or strategies
- Discussing proprietary technology
- Business partnerships or collaborations
- Employment agreements
- Mergers and acquisitions

Key Features:
- Defines what information is confidential
- Specifies the duration of confidentiality
- Outlines permitted uses of information
- Establishes consequences of breach

Remember: NDAs should be fair and reasonable to be legally enforceable.`
    },
    {
      title: 'General Legal Tips',
      content: `Important Reminders:

1. These templates are for general reference only and may not cover all legal requirements in your jurisdiction.

2. Always consult with a qualified lawyer for important legal matters, especially those involving significant financial or legal consequences.

3. Laws vary by state, country, and jurisdiction. Make sure your documents comply with local laws.

4. Keep copies of all legal documents in a safe place.

5. Review documents carefully before signing.

6. Understand all terms and conditions before entering into any agreement.`
    }
  ];

  return (
    <div className="legal-guides-container">
      <header className="page-header">
        <h1>Legal Guides</h1>
        <p>Simple explanations of common legal documents</p>
      </header>

      <div className="guides-list">
        {guides.map((guide, index) => (
          <div key={index} className="guide-card">
            <h2>{guide.title}</h2>
            <div className="guide-content">
              {guide.content.split('\n').map((line, i) => (
                <p key={i}>{line || '\u00A0'}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="navigation-links">
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
        <button onClick={() => navigate('/documents')} className="action-button">
          Generate Document
        </button>
      </div>
    </div>
  );
};

export default LegalGuides;
