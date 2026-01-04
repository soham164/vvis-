# Google Sign-In Setup Guide

Enable Google Sign-In for your admin panel in just a few steps!

## Step 1: Enable Google Sign-In in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **my-school-54da5**
3. Click **Authentication** in the left sidebar
4. Click **Get Started** (if you haven't enabled Authentication yet)
5. Click the **Sign-in method** tab
6. Find **Google** in the list of providers
7. Click on **Google**
8. Toggle the **Enable** switch to ON
9. Enter your **Project support email**: `vidyavikas440@gmail.com`
10. Click **Save**

That's it! Google Sign-In is now enabled.

## Step 2: Test Google Sign-In

1. Go to `http://localhost:3000/admin`
2. Click **"Sign in with Google"** button
3. Choose your Google account
4. You'll be redirected to the admin dashboard

## How It Works

### For Login:
- Users can sign in with email/password OR Google
- Google Sign-In is faster and more secure
- No need to remember passwords

### For Signup:
- New users can create accounts with email/password OR Google
- Google Sign-In automatically creates an account
- User info is stored in Firebase Authentication

## Security

- Google Sign-In uses OAuth 2.0 (industry standard)
- No passwords are stored for Google users
- Firebase handles all authentication securely
- Only authenticated users can access admin panel

## Troubleshooting

### "Popup blocked" error
- Allow popups for localhost in your browser
- Or use a different browser

### "Unauthorized domain" error
- This happens in production
- Add your domain in Firebase Console:
  1. Go to Authentication → Settings → Authorized domains
  2. Add your production domain (e.g., `yourschool.com`)

### Google Sign-In button doesn't work
- Check browser console for errors
- Make sure Firebase is properly configured
- Verify Google provider is enabled in Firebase Console

## Benefits of Google Sign-In

✅ **Faster**: One-click sign-in
✅ **Secure**: No password to remember or leak
✅ **Convenient**: Uses existing Google account
✅ **Professional**: Standard for modern web apps
✅ **Free**: No additional cost

## For Production

When deploying to production (e.g., Vercel, Netlify):

1. Add your production domain to Firebase:
   - Firebase Console → Authentication → Settings
   - Add domain under "Authorized domains"

2. Update OAuth consent screen (if needed):
   - Go to Google Cloud Console
   - Select your Firebase project
   - Configure OAuth consent screen with your school details

## Admin Management

To manage who can access the admin panel:

1. **Option 1**: Only allow specific Google accounts
   - Add email validation in your code
   - Check if user email matches allowed list

2. **Option 2**: Use Firebase Security Rules
   - Create custom claims for admin users
   - Check claims before allowing access

3. **Option 3**: Manual approval
   - New signups go to a "pending" state
   - Existing admin approves new admins

For now, anyone with a Google account can sign up. You can add restrictions later if needed.
