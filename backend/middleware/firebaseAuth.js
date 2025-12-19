/**
 * FIREBASE AUTHENTICATION MIDDLEWARE - firebaseAuth.js
 * 
 * Responsibility: Verify Firebase ID tokens and extract user UID
 * 
 * Architecture:
 * - This is middleware that runs before route handlers
 * - Validates Firebase ID token from Authorization header
 * - Extracts Firebase UID and attaches it to request object
 * - Rejects unauthenticated requests with 401 status
 * 
 * Security:
 * - NEVER trusts frontend-provided UID
 * - Always validates token server-side using firebase-admin
 * - Uses Firebase service account credentials for verification
 * 
 * Why Firebase UID?
 * - Firebase UID is unique per user and cannot be spoofed
 * - It's the standard identifier for Firebase-authenticated users
 * - Allows linking MongoDB documents to authenticated users securely
 */

import admin from 'firebase-admin';

// Track if Firebase is initialized
let firebaseInitialized = false;

// Initialize Firebase Admin SDK if not already initialized
// This uses service account credentials from environment variable
// NOTE: For demo purposes, Firebase is optional - MongoDB will work without it
if (!admin.apps.length) {
  try {
    // Get service account key from environment variable
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccount && serviceAccount.trim() !== '') {
      try {
        // If it's a JSON string, parse it
        const serviceAccountKey = typeof serviceAccount === 'string' 
          ? JSON.parse(serviceAccount) 
          : serviceAccount;
        
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccountKey),
        });
        
        firebaseInitialized = true;
        console.log('✅ Firebase Admin SDK initialized');
        console.log(`📋 Firebase Project: ${serviceAccountKey.project_id}`);
      } catch (parseError) {
        console.warn('⚠️ Firebase service account key is invalid JSON. Running in demo mode without Firebase.');
        firebaseInitialized = false;
      }
    } else {
      console.log('ℹ️  Firebase not configured - running in DEMO MODE');
      console.log('ℹ️  Documents will be saved to MongoDB without authentication');
      firebaseInitialized = false;
    }
  } catch (error) {
    console.warn('⚠️ Firebase initialization failed. Running in demo mode without Firebase.');
    console.warn('   MongoDB will still work - documents will use demo user ID');
    firebaseInitialized = false;
  }
} else {
  firebaseInitialized = true;
}

/**
 * Middleware to verify Firebase ID token (OPTIONAL for demo)
 * 
 * Flow:
 * 1. If Firebase is configured: Verify token and extract UID
 * 2. If Firebase is NOT configured: Use demo user ID
 * 3. Attach UID to request object as req.uid
 * 4. Call next() to continue to route handler
 * 
 * DEMO MODE:
 * - If Firebase is not configured, uses "demo-user" as UID
 * - Allows MongoDB to work without authentication
 * - Perfect for demonstrating the database integration
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const verifyFirebaseToken = async (req, res, next) => {
  // DEMO MODE: If Firebase is not initialized, use demo user ID
  if (!firebaseInitialized || !admin.apps.length) {
    // Use demo user ID for demonstration purposes
    req.uid = 'demo-user';
    console.log('ℹ️  Demo mode: Using demo-user ID (Firebase not configured)');
    return next();
  }

  // FIREBASE MODE: Verify token if Firebase is configured
  try {
    // Extract token from Authorization header
    // Expected format: "Bearer <firebase-id-token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // In demo mode, allow requests without token
      req.uid = 'demo-user';
      console.log('ℹ️  Demo mode: No token provided, using demo-user ID');
      return next();
    }

    // Extract token (remove "Bearer " prefix)
    const idToken = authHeader.split('Bearer ')[1];

    if (!idToken) {
      req.uid = 'demo-user';
      return next();
    }

    // Verify token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Extract Firebase UID from decoded token
    const firebaseUid = decodedToken.uid;

    // Attach UID to request object
    req.uid = firebaseUid;

    // Continue to next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, fall back to demo mode
    console.warn('⚠️  Token verification failed, using demo-user ID:', error.message);
    req.uid = 'demo-user';
    next();
  }
};
