# Deploy Firebase Security Rules

Your admin actions weren't working because Firebase security rules weren't configured. I've created the necessary rules files. Now you need to deploy them to Firebase.

## Quick Fix - Deploy via Firebase Console (Easiest)

### For Firestore Rules:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **my-school-54da5**
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab at the top
5. Copy the entire content from `firestore.rules` file
6. Paste it into the rules editor
7. Click **Publish** button

### For Storage Rules:

1. In Firebase Console, click **Storage** in the left sidebar
2. Click the **Rules** tab at the top
3. Copy the entire content from `storage.rules` file
4. Paste it into the rules editor
5. Click **Publish** button

## Alternative - Deploy via Firebase CLI

If you have Firebase CLI installed:

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not done)
firebase init

# Deploy only the rules
firebase deploy --only firestore:rules,storage:rules
```

## What These Rules Do

### Firestore Rules:
- **Public Read**: Everyone can view gallery, events, faculty, notices
- **Authenticated Write**: Only logged-in admins can add/edit/delete content
- **Contact Forms**: Anyone can submit, only admins can read

### Storage Rules:
- **Public Read**: Everyone can view uploaded images
- **Authenticated Write**: Only logged-in admins can upload
- **File Size Limits**: 
  - Gallery/Events: Max 10MB
  - Faculty: Max 5MB
  - Documents: Max 20MB
- **File Type Validation**: Only images for gallery/events/faculty

## After Deploying

1. Go to your admin panel: `http://localhost:3000/admin`
2. Login with your admin credentials
3. Try uploading a gallery image or creating an event
4. The changes should now reflect immediately on the website!

## Troubleshooting

If uploads still don't work after deploying rules:

1. **Check Authentication**: Make sure you're logged in as admin
2. **Check Browser Console**: Press F12 and look for error messages
3. **Verify Rules Deployed**: In Firebase Console, check if rules show your changes
4. **Clear Cache**: Hard refresh your browser (Ctrl+Shift+R)

## Security Note

These rules require authentication for write operations. Make sure you:
- Keep your admin credentials secure
- Don't share your Firebase config publicly
- Monitor your Firebase usage in the console
