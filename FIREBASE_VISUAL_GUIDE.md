# Firebase Console Visual Guide

## Where to Find Everything

### 🏠 Firebase Console Home
**URL:** https://console.firebase.google.com/

```
┌─────────────────────────────────────────────┐
│  Firebase Console                           │
├─────────────────────────────────────────────┤
│                                             │
│  [+ Add project]  ← Click here to start    │
│                                             │
│  Your Projects:                             │
│  ┌──────────────────┐                      │
│  │ School Website   │ ← Your project       │
│  │ Click to open    │                      │
│  └──────────────────┘                      │
└─────────────────────────────────────────────┘
```

### 📱 Project Overview (After clicking your project)

```
┌─────────────────────────────────────────────┐
│  School Website                             │
├──────────┬──────────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT                    │
│          │                                  │
│ Project  │  Get started by adding Firebase  │
│ Overview │  to your app                     │
│          │                                  │
│ ⚡Build   │  [</>] ← Click Web icon         │
│          │  Web    iOS    Android           │
│ Authenti-│                                  │
│ cation   │  Project Settings (gear icon)   │
│          │  ↑ Click here for config values  │
│ Firestore│                                  │
│ Database │                                  │
│          │                                  │
│ Storage  │                                  │
│          │                                  │
└──────────┴──────────────────────────────────┘
```

### 🔐 Getting Your Config Values

**Location:** Project Settings (gear icon) → General → Your apps → Web app

```
Firebase SDK snippet
Choose: Config

const firebaseConfig = {
  apiKey: "AIzaSyC..." ← Copy this
  authDomain: "school-abc123.firebaseapp.com" ← Copy this
  projectId: "school-abc123" ← Copy this
  storageBucket: "school-abc123.appspot.com" ← Copy this
  messagingSenderId: "123456789" ← Copy this
  appId: "1:123456789:web:abc123def456" ← Copy this
};
```

### 🔑 Authentication Setup

**Location:** Sidebar → Authentication

```
┌─────────────────────────────────────────────┐
│  Authentication                             │
├─────────────────────────────────────────────┤
│  [Get started] ← Click if first time        │
│                                             │
│  Tabs:                                      │
│  [Users] [Sign-in method] [Templates]...   │
│     ↑         ↑                             │
│     │         └─ Enable Email/Password here │
│     └─ Add admin user here                  │
│                                             │
│  Sign-in method tab:                        │
│  ┌──────────────────────────────────────┐  │
│  │ Email/Password    [Disabled] [Edit]  │  │
│  │                      ↑                │  │
│  │                      Click to enable  │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  Users tab:                                 │
│  [+ Add user] ← Click to create admin      │
│                                             │
│  Email: admin@school.com                    │
│  Password: ••••••••                         │
│  [Add user]                                 │
└─────────────────────────────────────────────┘
```

### 💾 Firestore Database Setup

**Location:** Sidebar → Firestore Database

```
┌─────────────────────────────────────────────┐
│  Firestore Database                         │
├─────────────────────────────────────────────┤
│  [Create database] ← Click if first time    │
│                                             │
│  Tabs:                                      │
│  [Data] [Rules] [Indexes] [Usage]          │
│           ↑                                 │
│           └─ Set security rules here        │
│                                             │
│  Rules tab:                                 │
│  ┌──────────────────────────────────────┐  │
│  │ rules_version = '2';                 │  │
│  │ service cloud.firestore {            │  │
│  │   match /databases/{database}/...    │  │
│  │                                      │  │
│  │   [Paste rules here]                 │  │
│  │                                      │  │
│  │ }                                    │  │
│  └──────────────────────────────────────┘  │
│  [Publish] ← Click after pasting rules     │
└─────────────────────────────────────────────┘
```

### 📦 Storage Setup

**Location:** Sidebar → Storage

```
┌─────────────────────────────────────────────┐
│  Storage                                    │
├─────────────────────────────────────────────┤
│  [Get started] ← Click if first time        │
│                                             │
│  Tabs:                                      │
│  [Files] [Rules] [Usage]                   │
│           ↑                                 │
│           └─ Set security rules here        │
│                                             │
│  Rules tab:                                 │
│  ┌──────────────────────────────────────┐  │
│  │ rules_version = '2';                 │  │
│  │ service firebase.storage {           │  │
│  │   match /b/{bucket}/o {              │  │
│  │                                      │  │
│  │   [Paste rules here]                 │  │
│  │                                      │  │
│  │   }                                  │  │
│  │ }                                    │  │
│  └──────────────────────────────────────┘  │
│  [Publish] ← Click after pasting rules     │
└─────────────────────────────────────────────┘
```

## 📋 Step-by-Step Checklist

### Step 1: Create Project
1. Go to https://console.firebase.google.com/
2. Click "+ Add project"
3. Enter project name
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Add Web App
1. Click the `</>` (Web) icon
2. Enter app nickname
3. Click "Register app"
4. **COPY all the config values**
5. Click "Continue to console"

### Step 3: Get Config Values
1. Click gear icon (⚙️) → Project settings
2. Scroll down to "Your apps"
3. Find your web app
4. Copy the config object values

### Step 4: Enable Authentication
1. Click "Authentication" in sidebar
2. Click "Get started"
3. Click "Sign-in method" tab
4. Click "Email/Password"
5. Toggle "Enable" ON
6. Click "Save"

### Step 5: Create Admin User
1. Stay in Authentication
2. Click "Users" tab
3. Click "+ Add user"
4. Enter email (e.g., admin@school.com)
5. Enter password (make it strong!)
6. Click "Add user"
7. **SAVE these credentials!**

### Step 6: Enable Firestore
1. Click "Firestore Database" in sidebar
2. Click "Create database"
3. Select "Start in production mode"
4. Choose location (closest to you)
5. Click "Enable"

### Step 7: Set Firestore Rules
1. Click "Rules" tab
2. Delete existing rules
3. Paste new rules (from FIREBASE_SETUP_GUIDE.md)
4. Click "Publish"

### Step 8: Enable Storage
1. Click "Storage" in sidebar
2. Click "Get started"
3. Click "Next"
4. Choose same location as Firestore
5. Click "Done"

### Step 9: Set Storage Rules
1. Click "Rules" tab
2. Delete existing rules
3. Paste new rules (from FIREBASE_SETUP_GUIDE.md)
4. Click "Publish"

### Step 10: Configure Your App
1. Open `.env.local` in your project
2. Paste the config values from Step 3
3. Save the file
4. Restart your dev server

## ✅ Verification

After setup, verify everything works:

1. **Check Firebase Console:**
   - ✅ Authentication: Email/Password enabled, 1 user created
   - ✅ Firestore: Database created, rules published
   - ✅ Storage: Bucket created, rules published

2. **Check Your App:**
   - ✅ Homepage loads without errors
   - ✅ Can access /admin page
   - ✅ Can login with admin credentials
   - ✅ Can add/edit content in admin panel

## 🎯 What Each Service Does

**Authentication:**
- Manages admin login
- Secures admin panel access
- Protects write operations

**Firestore Database:**
- Stores all content (events, faculty, etc.)
- Provides real-time updates
- Handles queries and filtering

**Storage:**
- Stores uploaded images
- Handles faculty photos
- Manages event images
- Stores gallery photos

## 🔗 Quick Links

- Firebase Console: https://console.firebase.google.com/
- Firebase Documentation: https://firebase.google.com/docs
- Firestore Rules: https://firebase.google.com/docs/firestore/security/get-started
- Storage Rules: https://firebase.google.com/docs/storage/security

---

**Remember:** Keep your Firebase credentials secure and never commit `.env.local` to Git!
