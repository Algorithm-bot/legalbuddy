/**
 * MODEL LAYER - TemplateModel.js
 * 
 * Responsibility: Store and manage legal document templates
 * This is a Model because it:
 * 1. Stores data (document templates)
 * 2. Contains no UI logic
 * 3. Provides data access methods
 * 4. Can be used by Controllers to retrieve templates
 */

// Document template definitions with placeholders
export const DocumentTemplates = {
  affidavit: {
    title: "Affidavit",
    description: "A sworn statement of fact",
    template: `AFFIDAVIT

I, {{name}}, son/daughter of {{fatherName}}, aged {{age}} years, residing at {{address}}, do hereby solemnly affirm and state as follows:

1. That the contents of this affidavit are true and correct to the best of my knowledge and belief.

2. That {{statement}}.

3. That I have signed this affidavit after fully understanding the contents thereof.

Place: {{place}}
Date: {{date}}

_______________________
{{name}}
(Signature of Deponent)`
  },

  rentalAgreement: {
    title: "Rental Agreement",
    description: "Agreement between landlord and tenant",
    template: `RENTAL AGREEMENT

This Rental Agreement is entered into on {{date}} between:

LANDLORD:
Name: {{landlordName}}
Address: {{landlordAddress}}
Phone: {{landlordPhone}}

TENANT:
Name: {{tenantName}}
Address: {{tenantAddress}}
Phone: {{tenantPhone}}

PROPERTY DETAILS:
Property Address: {{propertyAddress}}
Monthly Rent: ₹{{monthlyRent}}
Security Deposit: ₹{{securityDeposit}}
Lease Term: {{leaseTerm}} months

TERMS AND CONDITIONS:
1. The Tenant agrees to pay a monthly rent of ₹{{monthlyRent}} on or before the {{rentDueDate}} of each month.

2. The Tenant has paid a security deposit of ₹{{securityDeposit}} which will be refunded upon termination of this agreement, subject to deductions for damages, if any.

3. The Tenant shall use the property solely for residential purposes.

4. The Tenant shall not sublet the property without prior written consent from the Landlord.

5. This agreement shall remain in force for {{leaseTerm}} months from {{startDate}} to {{endDate}}.

IN WITNESS WHEREOF, both parties have signed this agreement on {{date}}.

_______________________          _______________________
{{landlordName}}                  {{tenantName}}
(Landlord)                        (Tenant)`
  },

  nda: {
    title: "Non-Disclosure Agreement (NDA)",
    description: "Confidentiality agreement between parties",
    template: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on {{date}} between:

DISCLOSING PARTY:
Name: {{disclosingPartyName}}
Address: {{disclosingPartyAddress}}

RECEIVING PARTY:
Name: {{receivingPartyName}}
Address: {{receivingPartyAddress}}

WHEREAS, the Disclosing Party possesses certain confidential and proprietary information that it desires to share with the Receiving Party for the purpose of {{purpose}}.

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION:
   "Confidential Information" shall mean all non-public, proprietary or confidential information disclosed by the Disclosing Party to the Receiving Party, whether orally or in writing, including but not limited to: {{confidentialDetails}}.

2. OBLIGATIONS:
   The Receiving Party agrees to:
   a) Hold and maintain the Confidential Information in strict confidence
   b) Not disclose the Confidential Information to any third party without prior written consent
   c) Use the Confidential Information solely for the purpose stated above
   d) Take reasonable precautions to protect the Confidential Information

3. EXCEPTIONS:
   This Agreement does not apply to information that:
   - Was already known to the Receiving Party
   - Is or becomes publicly available through no breach of this Agreement
   - Is independently developed by the Receiving Party

4. TERM:
   This Agreement shall remain in effect for {{validityPeriod}} from the date of execution.

5. RETURN OF INFORMATION:
   Upon termination of this Agreement, the Receiving Party shall return or destroy all Confidential Information.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

_______________________          _______________________
{{disclosingPartyName}}           {{receivingPartyName}}
(Disclosing Party)                (Receiving Party)`
  }
};

/**
 * Get template for a specific document type
 * @param {string} documentType - Type of document (affidavit, rentalAgreement, nda)
 * @returns {object|null} Template object or null if not found
 */
export const getTemplate = (documentType) => {
  return DocumentTemplates[documentType] || null;
};

/**
 * Get all available document types
 * @returns {array} Array of document type keys
 */
export const getAllDocumentTypes = () => {
  return Object.keys(DocumentTemplates);
};

/**
 * Get document metadata for all types
 * @returns {array} Array of document metadata objects
 */
export const getAllDocumentMetadata = () => {
  return Object.entries(DocumentTemplates).map(([key, value]) => ({
    type: key,
    title: value.title,
    description: value.description
  }));
};
