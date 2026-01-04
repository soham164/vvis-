# Complete Deployment Guide

This guide covers deploying your school website to Vercel, Netlify, or GitHub Pages with proper Firebase Auth configuration.

## Why Firebase Auth Doesn't Work After Deployment

Firebase Auth requires you to whitelist your deployment domain. By default, only `localhost` is authorized.

## Pre-Deployment Checklist

- [ ] Firebase project configured
- [ ] Firestore rules deployed
- [ ] Cloudinary configured
- [ ] Environment variables ready
- [ ] Firebase authorized domains configured

---

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### Step 3: Add Environment Variables

In Vercel project settings → Environment Variables, add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyADiY-kvaLezBuGmJFmt_JFfEhMrRFpyFg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=my-school-54da5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=my-school-54da5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=my-school-54da5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=827480225006
NEXT_PUBLIC_FIREBASE_APP_ID=1:827480225006:web:ce0ae6291f4d11a0262fff
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dzlvsnijp
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=school_gallery
```

**Important**: Copy these from your `.env.local` file!

### Step 4: Configure Firebase Authorized Domains

This is the critical step that makes Auth work:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **my-school-54da5**
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **"Add domain"**
5. Add your Vercel domain (e.g., `your-project.vercel.app`)
6. Click **"Add"**

### Step 5: Redeploy

After adding the domain to Firebase:
1. Go back to Vercel
2. Click **"Redeploy"** (or push a new commit)
3. Wait for deployment to complete
4. Test admin login at `https://your-project.vercel.app/admin`

---

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Netlify

1. Go to https://netlify.com/
2. Sign in with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose GitHub and select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Framework**: Next.js

### Step 3: Add Environment Variables

In Netlify site settings → Environment variables, add all the variables from Step 3 of Vercel guide.

### Step 4: Configure Firebase Authorized Domains

Same as Vercel Step 4, but add your Netlify domain (e.g., `your-project.netlify.app`)

---

## Option 3: GitHub Pages (Static Export)

**Note**: GitHub Pages requires static export, which has limitations with Next.js dynamic features.

### Step 1: Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

### Step 2: Add GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }}
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN }}
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_PROJECT_ID }}
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET }}
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID }}
        NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_APP_ID }}
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: ${{ secrets.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME }}
        NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: ${{ secrets.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### Step 3: Add Secrets to GitHub

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add all environment variables as secrets

### Step 4: Enable GitHub Pages

1. Repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`
4. Save

### Step 5: Configure Firebase Authorized Domains

Add your GitHub Pages domain: `username.github.io`

---

## Troubleshooting Firebase Auth

### Issue: "auth/unauthorized-domain"

**Solution**: Add your deployment domain to Firebase authorized domains:
1. Firebase Console → Authentication → Settings → Authorized domains
2. Add your domain (without `https://`)
3. Wait 1-2 minutes for changes to propagate
4. Clear browser cache and try again

### Issue: Admin login redirects to localhost

**Solution**: Check that `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` is set correctly in environment variables.

### Issue: Environment variables not working

**Solution**: 
- Vercel/Netlify: Redeploy after adding variables
- GitHub Actions: Make sure secrets are added
- All variables must start with `NEXT_PUBLIC_` to be accessible in browser

### Issue: "Firebase: Error (auth/configuration-not-found)"

**Solution**: 
- Verify all Firebase environment variables are set
- Check for typos in variable names
- Ensure Firebase project is active

---

## Testing Your Deployment

### 1. Test Public Pages
- [ ] Homepage loads
- [ ] Gallery shows images
- [ ] Events page works
- [ ] Contact form submits

### 2. Test Admin Login
- [ ] Go to `/admin`
- [ ] Login with admin credentials
- [ ] Upload a gallery image
- [ ] Create an event
- [ ] Upload a disclosure document

### 3. Test Firebase Features
- [ ] Admission ticker updates in real-time
- [ ] Gallery images load from Cloudinary
- [ ] PDFs open correctly

---

## Custom Domain Setup

### For Vercel:

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Add custom domain to Firebase authorized domains

### For Netlify:

1. Netlify Dashboard → Domain settings → Add custom domain
2. Update DNS records
3. Add custom domain to Firebase authorized domains

---

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` for a reason
2. **Use environment variables** - Never hardcode credentials
3. **Limit Firebase Auth domains** - Only add domains you control
4. **Monitor Firebase usage** - Check Firebase Console regularly
5. **Keep dependencies updated** - Run `npm audit` regularly

---

## Recommended: Vercel Deployment

**Why Vercel?**
- ✅ Built for Next.js
- ✅ Automatic deployments on push
- ✅ Easy environment variable management
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Preview deployments for branches
- ✅ No build configuration needed

**Deployment time**: ~5 minutes
**Cost**: Free for personal projects

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Firebase Auth Docs: https://firebase.google.com/docs/auth/web/start
- Next.js Deployment: https://nextjs.org/docs/deployment

## Quick Reference: Firebase Authorized Domains

Common domains to add:
- `localhost` (already added by default)
- `your-project.vercel.app` (Vercel)
- `your-project.netlify.app` (Netlify)
- `username.github.io` (GitHub Pages)
- `yourdomain.com` (Custom domain)
