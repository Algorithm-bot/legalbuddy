# Quick Start Guide - MongoDB Integration

## 🚀 Get Started in 5 Minutes

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Set Up MongoDB

**Option A: MongoDB Atlas (Cloud) - RECOMMENDED**
- Your connection string is already configured:
- `mongodb+srv://sahil:qwerty123@cluster0.aaiy6sn.mongodb.net/legal?retryWrites=true&w=majority`
- Database name: `legal`
- Make sure your IP is whitelisted in MongoDB Atlas Network Access

**Option B: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Use: `mongodb://localhost:27017/legalhelpbuddy`

### Step 3: Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Settings → Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Save the JSON file

### Step 4: Create Backend .env File

Create `backend/.env` (or update the existing one):

```env
# MongoDB Atlas Connection (Already configured)
MONGODB_URI=mongodb+srv://sahil:qwerty123@cluster0.aaiy6sn.mongodb.net/legal?retryWrites=true&w=majority

PORT=5000
FRONTEND_URL=http://localhost:5173
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project",...}
NODE_ENV=development
```

**Important:** 
- MongoDB Atlas connection is already configured ✅
- Paste the entire JSON from Step 3 as a string in `FIREBASE_SERVICE_ACCOUNT_KEY`
- Make sure your IP address is whitelisted in MongoDB Atlas Network Access settings

### Step 5: Start Backend

```bash
cd backend
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

### Step 6: Start Frontend

In a new terminal:

```bash
npm run dev
```

### Step 7: Test It!

1. Open http://localhost:5173
2. Sign in with Google
3. Generate a document
4. Check "My Documents" to see it saved!

## ✅ Verification

Test backend health:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "LegalHelpBuddy API is running"
}
```

## 🐛 Troubleshooting

**Backend won't start?**
- Check MongoDB is running
- Verify `.env` file exists
- Check port 5000 is free

**Can't connect to MongoDB?**
- Verify MongoDB URI is correct (already configured: `mongodb+srv://sahil:qwerty123@cluster0.aaiy6sn.mongodb.net/legal`)
- For Atlas: **IMPORTANT** - Add your IP address to MongoDB Atlas Network Access whitelist:
  1. Go to MongoDB Atlas Dashboard
  2. Click "Network Access" in left sidebar
  3. Click "Add IP Address"
  4. Add your current IP or use `0.0.0.0/0` for development (allows all IPs - not recommended for production)
  5. Wait 1-2 minutes for changes to propagate

**Firebase auth errors?**
- Verify service account key is valid JSON
- Check project ID matches
- Ensure service account has proper permissions

**Frontend can't reach backend?**
- Check backend is running
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS settings

## 📚 More Help

- See `SETUP_GUIDE.md` for detailed instructions
- See `backend/SETUP.md` for backend-specific setup
- See `INTEGRATION_SUMMARY.md` for architecture overview

---

**Ready to go!** 🎉
