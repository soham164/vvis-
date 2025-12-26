# Quick Start Checklist

## ✅ Firebase Setup (One-time setup)

Follow these steps in order:

### 1. Create Firebase Project (5 minutes)
- [ ] Go to https://console.firebase.google.com/
- [ ] Sign in with Google account
- [ ] Click "Add project"
- [ ] Name it (e.g., "School Website")
- [ ] Disable Google Analytics
- [ ] Click "Create project"

### 2. Add Web App (2 minutes)
- [ ] Click the Web icon `</>`
- [ ] Enter app nickname
- [ ] Click "Register app"
- [ ] **COPY the config values** (apiKey, authDomain, etc.)
- [ ] Keep this page open!

### 3. Enable Services (5 minutes)

**Authentication:**
- [ ] Click "Authentication" in sidebar
- [ ] Click "Get started"
- [ ] Click "Sign-in method" tab
- [ ] Enable "Email/Password"
- [ ] Click "Users" tab
- [ ] Click "Add user"
- [ ] Create admin email & password
- [ ] **WRITE DOWN** your admin credentials!

**Firestore Database:**
- [ ] Click "Firestore Database" in sidebar
- [ ] Click "Create database"
- [ ] Choose "Production mode"
- [ ] Select location
- [ ] Click "Enable"
- [ ] Go to "Rules" tab
- [ ] Copy rules from FIREBASE_SETUP_GUIDE.md Step 7
- [ ] Click "Publish"

**Storage:**
- [ ] Click "Storage" in sidebar
- [ ] Click "Get started"
- [ ] Click "Next" → "Done"
- [ ] Go to "Rules" tab
- [ ] Copy rules from FIREBASE_SETUP_GUIDE.md Step 9
- [ ] Click "Publish"

### 4. Configure Project (2 minutes)
- [ ] Open `.env.local` file in your project
- [ ] Paste the config values from Step 2
- [ ] Save the file
- [ ] Restart dev server: Stop (Ctrl+C) then `npm run dev`

### 5. Test Everything (3 minutes)
- [ ] Open http://localhost:3000 (should load without errors)
- [ ] Go to http://localhost:3000/admin
- [ ] Login with your admin credentials
- [ ] Try adding a test event
- [ ] Check if it appears on homepage

## 🎉 You're Done!

Your school website is now fully functional with:
- ✅ Real-time data updates
- ✅ Admin dashboard
- ✅ Image uploads
- ✅ Document management
- ✅ All pages working

## 📝 Admin Credentials Template

**Save this information securely:**

```
Admin Panel URL: http://localhost:3000/admin
Admin Email: _______________________
Admin Password: _______________________

Firebase Project: _______________________
Firebase Console: https://console.firebase.google.com/
```

## 🚀 Next Steps

1. **Customize Content:**
   - Update school name in navbar/footer
   - Change colors in tailwind.config.js
   - Add your school logo
   - Update contact information

2. **Add Content via Admin:**
   - Upload faculty photos and details
   - Add upcoming events
   - Upload gallery images
   - Add mandatory disclosure documents
   - Set admission notice ticker

3. **Deploy to Production:**
   - Use Vercel, Netlify, or Firebase Hosting
   - Add your domain
   - Update Firebase authorized domains

## ⚠️ Important Notes

- Never commit `.env.local` to Git (it's already in .gitignore)
- Keep your admin credentials secure
- Backup your Firebase data regularly
- Test on mobile devices for responsiveness

## 🆘 Common Issues

**"Invalid API Key"**
→ Check `.env.local` has correct values, restart server

**Can't login to admin**
→ Verify user exists in Firebase Console → Authentication → Users

**Images not uploading**
→ Check Storage is enabled and rules are published

**Page shows demo data**
→ Firebase not configured, check `.env.local` and restart

---

Need detailed instructions? See **FIREBASE_SETUP_GUIDE.md**
