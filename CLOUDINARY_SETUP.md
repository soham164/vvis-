# Cloudinary Setup Guide

Cloudinary is a free image hosting service that doesn't require billing. Perfect alternative to Firebase Storage!

## Why Cloudinary?

- ✅ **Free tier**: 25GB storage, 25GB bandwidth/month
- ✅ **No billing required**: Unlike Firebase Storage
- ✅ **Fast CDN**: Images load quickly worldwide
- ✅ **Easy integration**: Simple REST API
- ✅ **Automatic optimization**: Images are compressed automatically

## Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register_free
2. Sign up with your email (or use Google/GitHub)
3. Verify your email
4. You'll be redirected to the dashboard

## Step 2: Get Your Credentials

After logging in, you'll see your dashboard with:

1. **Cloud Name** - This is your unique identifier (e.g., `dxyz123abc`)
2. **API Key** - Your public key
3. **API Secret** - Your private key (keep this secret!)

You can find these at: https://console.cloudinary.com/console

## Step 3: Create Upload Preset

An upload preset allows unsigned uploads (no API secret needed in frontend):

1. In Cloudinary Console, go to **Settings** (gear icon)
2. Click **Upload** tab
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Set:
   - **Preset name**: `school_gallery` (or any name you like)
   - **Signing Mode**: **Unsigned** (important!)
   - **Folder**: `school-gallery` (optional, organizes your images)
6. Click **Save**

## Step 4: Add to .env.local

Open your `.env.local` file and add these lines:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=school_gallery
```

**Example:**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxyz123abc
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=school_gallery
```

Replace `your_cloud_name_here` with your actual Cloud Name from Step 2.

## Step 5: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 6: Test Upload

1. Go to `http://localhost:3000/admin`
2. Login with your admin credentials
3. Click **Gallery** tab
4. Upload an image
5. It should upload to Cloudinary and appear in your gallery!

## Verify Upload in Cloudinary

1. Go to https://console.cloudinary.com/console
2. Click **Media Library** in the left sidebar
3. You should see your uploaded images in the `school-gallery` folder

## How It Works

```
User uploads image
    ↓
React sends to Cloudinary API
    ↓
Cloudinary stores image & returns URL
    ↓
URL saved to Firestore
    ↓
Gallery page reads URL from Firestore
    ↓
Image displays from Cloudinary CDN
```

## Benefits Over Firebase Storage

| Feature | Cloudinary | Firebase Storage |
|---------|-----------|------------------|
| Free tier | 25GB storage | 5GB storage |
| Billing required | ❌ No | ✅ Yes |
| Setup complexity | Easy | Medium |
| Image optimization | Automatic | Manual |
| CDN | Included | Included |

## Troubleshooting

### "Cloudinary not configured" error
- Check `.env.local` has both variables
- Restart dev server after adding variables
- Make sure variable names start with `NEXT_PUBLIC_`

### Upload fails with 401 error
- Upload preset must be **Unsigned**
- Check preset name matches exactly
- Verify cloud name is correct

### Image uploads but doesn't show
- Check browser console for errors
- Verify Firestore rules are deployed
- Hard refresh page (Ctrl+Shift+R)

### "Invalid cloud name" error
- Double-check cloud name from Cloudinary dashboard
- No spaces or special characters
- Case-sensitive

## Free Tier Limits

Cloudinary free tier includes:
- **Storage**: 25GB
- **Bandwidth**: 25GB/month
- **Transformations**: 25 credits/month
- **Images**: Unlimited

For a school website, this is more than enough!

## Optional: Image Transformations

Cloudinary can automatically optimize images. You can modify the upload function to add transformations:

```typescript
// In GalleryManager.tsx, modify uploadToCloudinary:
formData.append('transformation', 'c_limit,w_1920,q_auto:good');
```

This will:
- Limit width to 1920px
- Auto-compress for best quality/size ratio
- Save bandwidth and load faster

## Security Note

- Never commit `.env.local` to Git (it's already in `.gitignore`)
- Upload preset is unsigned (safe for frontend)
- API Secret is NOT needed for uploads
- Only authenticated admins can upload (Firebase Auth protects the admin page)

## Need Help?

- Cloudinary Docs: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com/
