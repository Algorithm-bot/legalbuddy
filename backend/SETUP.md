# Backend Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (local installation or MongoDB Atlas account)
3. **Firebase Project** with Service Account credentials

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```env
# MongoDB Connection URI
# For MongoDB Atlas (Cloud):
MONGODB_URI=mongodb+srv://sahil:qwerty123@cluster0.aaiy6sn.mongodb.net/legal?retryWrites=true&w=majority
# Or for local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/legalhelpbuddy

# Server Port
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Firebase Service Account Key (JSON string)
# Get this from Firebase Console > Project Settings > Service Accounts
# Generate new private key and paste the entire JSON here as a string
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project-id",...}

# Node Environment
NODE_ENV=development
```

### 3. Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** > **Service Accounts**
4. Click **Generate New Private Key**
5. Copy the entire JSON content
6. Paste it as a string in `FIREBASE_SERVICE_ACCOUNT_KEY` in your `.env` file

**Important:** Keep this key secure and never commit it to version control!

### 4. Set Up MongoDB

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/legalhelpbuddy` as `MONGODB_URI`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Replace `<password>` with your database password
5. Use the connection string as `MONGODB_URI`

### 5. Start the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running

### Documents (Protected - Requires Firebase Auth)
- **POST** `/api/documents` - Save a document
  - Headers: `Authorization: Bearer <firebase-id-token>`
  - Body: `{ documentType, content, formData }`

- **GET** `/api/documents` - Get user's documents
  - Headers: `Authorization: Bearer <firebase-id-token>`

## Testing

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify `MONGODB_URI` is correct
- Check firewall settings if using MongoDB Atlas

### Firebase Auth Error
- Verify `FIREBASE_SERVICE_ACCOUNT_KEY` is valid JSON
- Check Firebase project ID matches
- Ensure service account has proper permissions

### CORS Error
- Update `FRONTEND_URL` in `.env` to match your frontend URL
- Check if frontend is running on the specified port
