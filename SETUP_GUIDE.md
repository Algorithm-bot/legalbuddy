# LegalHelpBuddy - MongoDB Integration Setup Guide

## Overview

This guide explains how to set up the MongoDB backend integration for LegalHelpBuddy.

## Architecture

The project follows **MVC (Model-View-Controller)** architecture:

- **Models**: Data structures and business logic (`src/models/`, `backend/models/`)
- **Views**: UI components (`src/views/`)
- **Controllers**: Handle user actions and coordinate between Views and Models (`src/controllers/`, `backend/controllers/`)
- **Services**: API communication layer (`src/services/`)

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `firebase-admin` - Firebase server SDK
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

### 3. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```env
# MongoDB Atlas Connection (Already configured)
MONGODB_URI=mongodb+srv://sahil:qwerty123@cluster0.aaiy6sn.mongodb.net/legal?retryWrites=true&w=majority

PORT=5000
FRONTEND_URL=http://localhost:5173
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
NODE_ENV=development
```

**Important MongoDB Atlas Setup:**
1. Your connection string is already configured ✅
2. **CRITICAL:** Add your IP address to MongoDB Atlas Network Access:
   - Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Add your current IP address OR use `0.0.0.0/0` for development (allows all IPs)
   - Wait 1-2 minutes for changes to take effect
3. Database name: `legal` (as specified in connection string)

**See `backend/SETUP.md` for detailed instructions.**

### 4. Start Backend Server

```bash
npm start
```

Server runs on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies (if not already done)

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Frontend Development Server

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## How It Works

### Document Generation Flow

1. **User fills form** → `DocumentForm` (View)
2. **Form submission** → `handleDocumentGeneration` (Controller)
3. **Document generated** → `generateDocument` (Model)
4. **Document displayed** → `GeneratedDocument` (View)
5. **Auto-save** → `saveDocumentToBackend` (Controller) → `documentService` (Service) → Backend API → MongoDB

### Document Retrieval Flow

1. **User clicks "My Documents"** → `MyDocuments` (View)
2. **Fetch documents** → `getUserDocuments` (Service) → Backend API
3. **Backend validates token** → `verifyFirebaseToken` (Middleware)
4. **Query MongoDB** → `getUserDocuments` (Controller) → `Document` (Model)
5. **Return documents** → Frontend displays list

### Security Flow

1. **User signs in** → Firebase Auth (client-side)
2. **Get ID token** → `user.getIdToken()`
3. **Send request** → Include `Authorization: Bearer <token>` header
4. **Backend verifies** → Firebase Admin SDK validates token
5. **Extract UID** → `req.uid` set by middleware
6. **Query database** → Only documents with matching `firebaseUid`

## Key Features

### ✅ Secure Authentication
- Firebase ID tokens verified server-side
- Never trust client-provided UID
- Middleware protects all document routes

### ✅ User-Specific Data
- Documents linked to Firebase UID
- Users can only access their own documents
- Indexed queries for fast retrieval

### ✅ MVC Architecture
- Clear separation of concerns
- Controllers coordinate between Views and Models
- Service layer abstracts API calls

### ✅ Error Handling
- Graceful error messages
- Loading states
- Empty states for better UX

## File Structure

```
LegalHelpBuddy/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── documentController.js  # Business logic
│   ├── middleware/
│   │   └── firebaseAuth.js     # Token verification
│   ├── models/
│   │   └── Document.js        # Mongoose schema
│   ├── routes/
│   │   └── documentRoutes.js  # API endpoints
│   ├── server.js              # Express server
│   └── package.json
├── src/
│   ├── controllers/
│   │   └── DocumentController.js  # Frontend controller
│   ├── services/
│   │   └── documentService.js     # API communication
│   ├── views/
│   │   ├── MyDocuments.jsx        # Document list view
│   │   ├── GeneratedDocument.jsx  # Document display
│   │   └── ...
│   └── ...
└── ...
```

## Testing

### Test Backend Health

```bash
curl http://localhost:5000/api/health
```

### Test Document Save (requires auth token)

```bash
curl -X POST http://localhost:5000/api/documents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <firebase-id-token>" \
  -d '{
    "documentType": "affidavit",
    "content": "Document content...",
    "formData": {"field1": "value1"}
  }'
```

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `.env` file exists and has correct values
- Check port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running
- Check `VITE_API_URL` in frontend `.env`
- Check CORS settings in backend

### Authentication errors
- Verify Firebase service account key is correct
- Check Firebase project ID matches
- Ensure user is signed in on frontend

### Documents not saving
- Check browser console for errors
- Verify backend is running
- Check network tab for API requests
- Verify Firebase token is being sent

## Next Steps

1. Set up MongoDB (local or Atlas)
2. Configure Firebase service account
3. Start backend server
4. Start frontend server
5. Sign in and generate a document
6. Check "My Documents" to see saved documents

## Support

For issues or questions, check:
- Backend logs in terminal
- Browser console for frontend errors
- Network tab for API request/response details
