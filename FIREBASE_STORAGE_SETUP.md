# Firebase Storage Setup Guide

If gallery uploads aren't working, Firebase Storage might not be enabled or configured properly.

## Step 1: Enable Firebase Storage

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **my-school-54da5**
3. Click **Storage** in the left sidebar
4. If you see "Get Started", click it to enable Storage
5. Choose **Start in production mode** (we'll add rules next)
6. Select your storage location (choose closest to your users)
7. Click **Done**

## Step 2: Deploy Storage Rules

After enabling Storage:

1. In Firebase Console, go to **Storage** → **Rules** tab
2. Copy the entire content from `storage.rules` file in your project
3. Paste it into the rules editor
4. Click **Publish**

Your `storage.rules` should look like this:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
    // ... other rules
  }
}
```

## Step 3: Verify Storage Bucket in .env.local

Make sure your `.env.local` has the correct storage bucket:

```
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=my-school-54da5.firebasestorage.app
```

**Important**: The bucket URL should end with `.firebasestorage.app` (new format) or `.appspot.com` (old format).

## Step 4: Test the Upload

1. Restart your dev server:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. Go to `http://localhost:3000/admin`
3. Login with your admin credentials
4. Click **Gallery** tab
5. Try uploading an image
6. Open browser console (F12) to see detailed logs

## Common Issues & Solutions

### Issue 1: "Storage permissions not configured"
**Solution**: Deploy the `storage.rules` file (see Step 2)

### Issue 2: "Firebase Storage might not be enabled"
**Solution**: Enable Storage in Firebase Console (see Step 1)

### Issue 3: "Upload shows 'Uploading...' but never completes"
**Possible causes**:
- Storage not enabled in Firebase Console
- Wrong storage bucket URL in `.env.local`
- Network/firewall blocking Firebase Storage
- File size too large (max 10MB for gallery)

**Solution**:
1. Check browser console (F12) for error messages
2. Verify Storage is enabled in Firebase Console
3. Check `.env.local` has correct `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
4. Try with a smaller image (< 1MB) first

### Issue 4: "storage/unauthorized"
**Solution**: 
- Make sure you're logged in as admin
- Deploy storage rules (Step 2)
- Check that rules allow authenticated writes

### Issue 5: Image uploads but doesn't show on gallery page
**Solution**:
- Check Firestore rules are also deployed
- Verify image was saved to Firestore (check Firebase Console → Firestore Database → gallery collection)
- Hard refresh the gallery page (Ctrl+Shift+R)

## Verify Everything is Working

### Check Firebase Console:

1. **Storage** → **Files** tab
   - You should see a `gallery/` folder after successful upload
   - Click on uploaded images to verify they're accessible

2. **Firestore Database** → **gallery** collection
   - Each uploaded image should have a document with:
     - `title`: Image title
     - `category`: Category name
     - `imageUrl`: Full URL to the image
     - `uploadedAt`: Timestamp

3. **Storage** → **Rules** tab
   - Should show your custom rules, not default deny-all

## Still Not Working?

If uploads still fail after following all steps:

1. **Check browser console** (F12) - look for red error messages
2. **Check Firebase Console** → **Storage** → **Usage** tab
   - See if any upload attempts are logged
3. **Try a different browser** - sometimes cache causes issues
4. **Check file size** - must be under 10MB
5. **Check file type** - must be an image (jpg, png, gif, etc.)

## Test with Console Logs

The updated GalleryManager now includes detailed console logs. When you try to upload, you should see:

```
Starting upload... [filename]
Uploading to storage...
Upload complete, getting URL...
Got download URL: [url]
Saving to Firestore...
Successfully saved to Firestore!
```

If it stops at any step, that's where the issue is!

## Quick Checklist

- [ ] Firebase Storage enabled in Console
- [ ] Storage rules deployed
- [ ] Firestore rules deployed
- [ ] Correct storage bucket in `.env.local`
- [ ] Logged in as admin
- [ ] Dev server restarted after changes
- [ ] Browser console checked for errors
- [ ] Image is under 10MB
- [ ] Image is a valid image file
