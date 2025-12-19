# Troubleshooting Guide

## Error: "Failed to determine project ID: ENOTFOUND metadata.google.internal"

### Problem
Firebase Admin SDK cannot initialize because the service account key is missing.

### Solution
1. **Get Firebase Service Account Key:**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Copy the entire JSON

2. **Add to `backend/.env`:**
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...",...}
   ```

3. **Restart server:**
   ```bash
   cd backend
   npm start
   ```

See `backend/FIREBASE_SETUP.md` for detailed instructions.

---

## Data Not Storing in MongoDB

### Check 1: MongoDB Connection
Verify MongoDB is connected:
```bash
# Look for this in server logs:
✅ MongoDB Connected: cluster0-shard-00-00.aaiy6sn.mongodb.net
📊 Database: legal
```

**If not connected:**
- Check `MONGODB_URI` in `backend/.env`
- Verify IP is whitelisted in MongoDB Atlas
- Check internet connection

### Check 2: Firebase Authentication
Verify Firebase is initialized:
```bash
# Look for this in server logs:
✅ Firebase Admin SDK initialized
📋 Firebase Project: your-project-id
```

**If not initialized:**
- See Firebase setup above
- Check `FIREBASE_SERVICE_ACCOUNT_KEY` in `.env`

### Check 3: Request Reaching Backend
Check server logs when saving document:
```bash
💾 Attempting to save document for user: <uid>
📄 Document type: <type>
✅ Document saved successfully with ID: <id>
```

**If you don't see these logs:**
- Request might be blocked by CORS
- Check browser console for errors
- Verify frontend is sending requests to correct URL

### Check 4: Authentication Token
Verify token is being sent:
- Open browser DevTools → Network tab
- Look for POST request to `/api/documents`
- Check Request Headers for `Authorization: Bearer <token>`

**If token is missing:**
- User might not be signed in
- Check `src/services/documentService.js`
- Verify `auth.currentUser` exists

### Check 5: MongoDB Atlas Network Access
**Critical:** Your IP must be whitelisted:
1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Add your IP or `0.0.0.0/0` for development
4. Wait 1-2 minutes

---

## Common Issues

### Issue: "401 Unauthorized" when saving
**Cause:** Firebase token verification failed
**Solution:**
- Check Firebase Admin SDK is initialized
- Verify token is being sent in request
- Check token hasn't expired (sign in again)

### Issue: "500 Internal Server Error"
**Cause:** Server-side error
**Solution:**
- Check server logs for detailed error
- Verify MongoDB connection
- Check Firebase initialization
- Verify all required fields in request body

### Issue: CORS Error
**Cause:** Frontend URL not whitelisted
**Solution:**
- Update `FRONTEND_URL` in `backend/.env`
- Match exact URL (including port)
- Restart server after changes

### Issue: "MongoServerError: bad auth"
**Cause:** MongoDB credentials incorrect
**Solution:**
- Verify username/password in connection string
- Check MongoDB Atlas → Database Access → Users

### Issue: "MongoServerError: IP not whitelisted"
**Cause:** IP address not in MongoDB Atlas whitelist
**Solution:**
- Add IP to Network Access in MongoDB Atlas
- Wait 1-2 minutes for propagation

---

## Debug Checklist

- [ ] MongoDB connected (see ✅ MongoDB Connected in logs)
- [ ] Firebase initialized (see ✅ Firebase Admin SDK initialized)
- [ ] `.env` file exists in `backend/` folder
- [ ] `MONGODB_URI` is set correctly
- [ ] `FIREBASE_SERVICE_ACCOUNT_KEY` is set correctly
- [ ] IP whitelisted in MongoDB Atlas
- [ ] Server restarted after `.env` changes
- [ ] User is signed in on frontend
- [ ] Browser console shows no errors
- [ ] Network tab shows successful API requests

---

## Quick Test

Test the health endpoint:
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

If this works, the server is running. Check MongoDB and Firebase setup next.

---

## Still Having Issues?

1. **Check server logs** - Look for error messages
2. **Check browser console** - Look for frontend errors
3. **Check Network tab** - Verify API requests are being made
4. **Verify .env file** - Make sure all variables are set
5. **Restart everything** - Server, browser, clear cache

---

**Need more help?** Check:
- `backend/FIREBASE_SETUP.md` - Firebase configuration
- `backend/MONGODB_ATLAS_SETUP.md` - MongoDB Atlas setup
- `backend/SETUP.md` - Complete setup guide
