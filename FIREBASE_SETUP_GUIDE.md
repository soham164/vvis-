# Firebase Setup Guide for School Website

## Step 1: Create a Firebase Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account (or create one if you don't have it)
3. Click "Add project" or "Create a project"

## Step 2: Create Your Firebase Project

1. **Project Name**: Enter a name like "School Website" or "My School"
2. Click "Continue"
3. **Google Analytics**: You can disable this for now (toggle it off)
4. Click "Create project"
5. Wait for the project to be created (takes ~30 seconds)
6. Click "Continue" when done

## Step 3: Register Your Web App

1. On the Firebase Console homepage, you'll see "Get started by adding Firebase to your app"
2. Click the **Web icon** (looks like `</>`)
3. **App nickname**: Enter "School Website" or any name
4. **Don't check** "Also set up Firebase Hosting"
5. Click "Register app"
6. You'll see a code snippet with your Firebase configuration
7. **IMPORTANT**: Copy these values - you'll need them soon:
   ```
   apiKey: "AIza..."
   authDomain: "your-project.firebaseapp.com"
   projectId: "your-project-id"
   storageBucket: "your-project.appspot.com"
   messagingSenderId: "123456789"
   appId: "1:123456789:web:abc123"
   ```
8. Click "Continue to console"

## Step 4: Enable Authentication

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Click on the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** to ON
6. Click **"Save"**

## Step 5: Create Admin User

1. Still in Authentication, click the **"Users"** tab
2. Click **"Add user"**
3. Enter:
   - **Email**: Your admin email (e.g., admin@yourschool.com)
   - **Password**: Create a strong password (you'll use this to login)
4. Click **"Add user"**
5. **IMPORTANT**: Save this email and password - you'll need it to login to the admin panel!

## Step 6: Enable Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll set rules next)
4. Click **"Next"**
5. Choose your location (select closest to you)
6. Click **"Enable"**
7. Wait for the database to be created

## Step 7: Set Firestore Security Rules

1. In Firestore Database, click the **"Rules"** tab
2. Replace the existing rules with this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to all collections
    match /{document=**} {
      allow read: if true;
    }
    
    // Only authenticated users can write
    match /{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

## Step 8: Enable Storage (OPTIONAL - See Note Below)

**Note:** Storage is used for uploading images and PDFs. You can skip this if you plan to use external image URLs instead.

**To enable Storage (FREE - No billing required):**

1. In the left sidebar, click **"Storage"**
2. Click **"Get started"**
3. **IMPORTANT**: Select **"Start in test mode"** (not production mode)
   - This avoids billing prompts
   - Still completely FREE
4. Click **"Next"**
5. Choose your location (same as Firestore)
6. Click **"Done"**

**If it asks for billing:** Just close the prompt and select "Start in test mode" instead. You'll stay on the FREE tier (5GB storage, plenty for a school website).

## Step 9: Set Storage Security Rules

1. In Storage, click the **"Rules"** tab
2. Replace the existing rules with this:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Only authenticated users can upload
    match /{allPaths=**} {
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

## Step 10: Configure Your Project

1. Open the `.env.local` file in your project
2. Fill in the values from Step 3:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

3. Save the file

## Step 11: Restart Your Development Server

1. Stop the current server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. Open http://localhost:3000

## Step 12: Test Admin Login

1. Go to http://localhost:3000/admin
2. Login with:
   - **Email**: The admin email you created in Step 5
   - **Password**: The password you created in Step 5
3. You should now see the admin dashboard!

## What You Can Do Now

### As Admin:
- **Admission Ticker**: Update the scrolling notice on homepage
- **Events**: Add/delete school events with images
- **Faculty**: Add/edit/delete faculty members with photos
- **Gallery**: Upload photos to the gallery
- **Disclosures**: Upload PDF documents for mandatory disclosure

### Public Pages:
- All pages work with real-time data from Firebase
- Visitors can see events, faculty, gallery without login
- Contact form submissions are saved to Firebase

## Troubleshooting

### "Invalid API Key" Error
- Make sure you copied the correct values from Firebase Console
- Check that there are no extra spaces in `.env.local`
- Restart the dev server after changing `.env.local`

### Can't Login to Admin
- Verify the email/password in Firebase Console → Authentication → Users
- Make sure Email/Password authentication is enabled
- Check browser console for error messages

### Images Not Uploading
- Verify Storage is enabled in Firebase Console
- Check Storage rules are published correctly
- Make sure you're logged in as admin

## Need Help?

If you get stuck:
1. Check the Firebase Console for error messages
2. Look at the browser console (F12) for errors
3. Make sure all Firebase services are enabled (Authentication, Firestore, Storage)

---

**Your Admin Credentials:**
- URL: http://localhost:3000/admin
- Email: [The email you created in Step 5]
- Password: [The password you created in Step 5]

Save these credentials securely!
