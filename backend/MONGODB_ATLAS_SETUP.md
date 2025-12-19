# MongoDB Atlas Setup - Quick Reference

## ✅ Your Connection String (Already Configured)

```
mongodb+srv://sahil:qwerty123@cluster0.aaiy6sn.mongodb.net/legal?retryWrites=true&w=majority
```

**Database Name:** `legal`

## 🔐 Critical: Network Access Configuration

**IMPORTANT:** Before the backend can connect to MongoDB Atlas, you MUST whitelist your IP address.

### Steps to Whitelist IP:

1. **Go to MongoDB Atlas Dashboard**
   - Visit: https://cloud.mongodb.com/
   - Sign in with your MongoDB Atlas account

2. **Navigate to Network Access**
   - Click "Network Access" in the left sidebar
   - Or go directly to: https://cloud.mongodb.com/v2#/security/network/whitelist

3. **Add IP Address**
   - Click the green "Add IP Address" button
   - Choose one of these options:
     - **Option A (Recommended for Development):** Click "Allow Access from Anywhere"
       - This adds `0.0.0.0/0` (allows all IPs)
       - ⚠️ Only use for development/testing
     - **Option B (More Secure):** Add your current IP address
       - Click "Add Current IP Address"
       - Or manually enter your IP

4. **Wait for Propagation**
   - Changes take 1-2 minutes to propagate
   - You'll see a green checkmark when ready

5. **Verify Connection**
   - Start your backend server: `npm start`
   - You should see: `✅ MongoDB Connected: cluster0-shard-00-00.aaiy6sn.mongodb.net`

## 🧪 Test Connection

After whitelisting your IP, test the connection:

```bash
cd backend
npm start
```

Expected output:
```
✅ Firebase Admin SDK initialized
✅ MongoDB Connected: cluster0-shard-00-00.aaiy6sn.mongodb.net
📊 Database: legal
🚀 Server running on port 5000
```

## 🐛 Troubleshooting

### Error: "MongoServerError: bad auth"
- **Solution:** Verify username and password in connection string are correct
- Check MongoDB Atlas → Database Access → Users

### Error: "MongoServerError: IP not whitelisted"
- **Solution:** Add your IP to Network Access (see steps above)
- Wait 1-2 minutes after adding IP

### Error: "Connection timeout"
- **Solution:** 
  - Check your internet connection
  - Verify firewall isn't blocking MongoDB ports
  - Try adding `0.0.0.0/0` temporarily to test

### Error: "Database name not found"
- **Solution:** MongoDB Atlas will create the database automatically on first document save
- Database name `legal` is correct in your connection string

## 📝 Connection String Breakdown

```
mongodb+srv://sahil:qwerty123@cluster0.aaiy6sn.mongodb.net/legal?retryWrites=true&w=majority
│         │    │         │                              │      │
│         │    │         │                              │      └─ Write concern (majority)
│         │    │         │                              └─ Database name: "legal"
│         │    │         └─ Cluster hostname
│         │    └─ Password
│         └─ Username
└─ Protocol (MongoDB Atlas)
```

## 🔒 Security Best Practices

1. **Never commit connection strings to Git**
   - Already handled: `.env` is in `.gitignore` ✅

2. **Use environment variables**
   - Connection string is in `backend/.env` ✅

3. **Restrict IP access in production**
   - Use specific IPs instead of `0.0.0.0/0`
   - Or use MongoDB Atlas VPC peering for production

4. **Rotate passwords regularly**
   - MongoDB Atlas → Database Access → Users → Edit → Reset Password

## ✅ Verification Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created and running
- [ ] Database user created (username: `sahil`)
- [ ] IP address whitelisted in Network Access
- [ ] Connection string added to `backend/.env`
- [ ] Backend server connects successfully
- [ ] Can see "✅ MongoDB Connected" message

---

**Status:** ✅ Connection string configured
**Next Step:** Whitelist your IP address in MongoDB Atlas Network Access
