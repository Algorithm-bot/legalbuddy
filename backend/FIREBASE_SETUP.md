# Firebase Service Account Setup Guide

## ⚠️ Critical: This is Required for Authentication

The error you're seeing means Firebase Admin SDK is not properly configured. You need to set up the Firebase Service Account Key.

## Step-by-Step Instructions

### 1. Get Firebase Service Account Key

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Select Your Project**
   - Click on your project (or create one if you don't have one)

3. **Navigate to Service Accounts**
   - Click the gear icon ⚙️ next to "Project Overview"
   - Select **"Project settings"**
   - Click on the **"Service accounts"** tab

4. **Generate New Private Key**
   - Click **"Generate new private key"** button
   - A warning dialog will appear - click **"Generate key"**
   - A JSON file will download automatically

5. **Copy the JSON Content**
   - Open the downloaded JSON file
   - Copy the **entire contents** of the file
   - It should look like this:
   ```json
   {
     "type": "service_account",
     "project_id": "your-project-id",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "...",
     "client_id": "...",
     "auth_uri": "...",
     "token_uri": "...",
     "auth_provider_x509_cert_url": "...",
     "client_x509_cert_url": "..."
   }
   ```

### 2. Add to .env File

1. **Open or create** `backend/.env` file

2. **Add the Firebase Service Account Key**
   - Add this line (replace with your actual JSON):
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project-id",...}
   ```
   
   **Important:** 
   - Paste the **entire JSON** as a single line
   - Make sure all quotes are properly escaped
   - The JSON should be on one line (no line breaks)

3. **Example .env file:**
   ```env
   MONGODB_URI=mongodb+srv://sahil:qwerty123@cluster0.aaiy6sn.mongodb.net/legal?retryWrites=true&w=majority
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"legalhelpbuddy","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk@legalhelpbuddy.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk%40legalhelpbuddy.iam.gserviceaccount.com"}
   NODE_ENV=development
   ```

### 3. Alternative: Use JSON File Path (Easier)

If the JSON string is too long, you can use a file path instead:

1. **Save the JSON file** in the `backend` folder as `firebase-service-account.json`

2. **Update `backend/middleware/firebaseAuth.js`** to support file path:
   ```javascript
   import admin from 'firebase-admin';
   import path from 'path';
   import { fileURLToPath } from 'url';
   
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   
   if (!admin.apps.length) {
     const serviceAccountPath = path.join(__dirname, '..', 'firebase-service-account.json');
     const serviceAccount = require(serviceAccountPath);
     
     admin.initializeApp({
       credential: admin.credential.cert(serviceAccount),
     });
   }
   ```

3. **Add to .gitignore:**
   ```
   firebase-service-account.json
   ```

### 4. Restart the Server

After adding the service account key:

```bash
cd backend
npm start
```

You should see:
```
✅ Firebase Admin SDK initialized
📋 Firebase Project: your-project-id
✅ MongoDB Connected: ...
🚀 Server running on port 5000
```

## Troubleshooting

### Error: "FIREBASE_SERVICE_ACCOUNT_KEY is not set"
- **Solution:** Make sure you created `backend/.env` file
- Check that the variable name is exactly `FIREBASE_SERVICE_ACCOUNT_KEY`
- Restart the server after adding the key

### Error: "not valid JSON"
- **Solution:** Make sure the entire JSON is on one line
- Check that all quotes are properly escaped
- Remove any line breaks in the JSON string

### Error: "missing required fields"
- **Solution:** Ensure you copied the complete JSON from Firebase Console
- Don't modify the JSON structure

### Still Getting Errors?
1. Verify the `.env` file is in the `backend` folder (not root)
2. Check that `dotenv` is loading the file (see `server.js`)
3. Make sure you restarted the server after adding the key
4. Check server logs for specific error messages

## Security Note

⚠️ **Never commit the service account key to Git!**
- The `.env` file is already in `.gitignore` ✅
- If using a JSON file, add it to `.gitignore` too
- Keep the key secure and private

---

**Once configured, your Firebase authentication will work and documents will save to MongoDB!** 🎉
