# School Website - Complete Management System

A modern, full-featured school website with admin dashboard built with Next.js, Firebase, and Tailwind CSS.

## 🌟 Features

### Public Pages
- **Home**: Hero section, stats, admission ticker, upcoming events
- **About**: Mission, vision, core values
- **Academics**: Programs, facilities, curriculum highlights
- **Admissions**: Process, fee structure, inquiry form
- **Faculty**: Staff directory with photos and qualifications
- **Events**: Upcoming and past events with images
- **Gallery**: Photo gallery with categories
- **Contact**: Contact form with Google Maps integration
- **Mandatory Disclosure**: Document repository

### Admin Dashboard (`/admin`)
- **Admission Ticker**: Real-time scrolling notice on homepage
- **Events Manager**: Add/edit/delete events with images
- **Faculty Manager**: Manage faculty profiles with photos
- **Gallery Manager**: Upload and organize photos
- **Disclosure Manager**: Upload PDF documents

### Technical Features
- ✅ Real-time data updates with Firestore
- ✅ Image upload and storage
- ✅ Secure authentication
- ✅ Responsive design (mobile-friendly)
- ✅ Smooth animations with Framer Motion
- ✅ SEO optimized
- ✅ Fast performance with Next.js

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Google account (for Firebase)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Firebase** (First time only - 15 minutes):
   
   📖 **Follow one of these guides:**
   - **Quick Start**: `QUICK_START.md` (checklist format)
   - **Detailed Guide**: `FIREBASE_SETUP_GUIDE.md` (step-by-step)
   - **Visual Guide**: `FIREBASE_VISUAL_GUIDE.md` (with screenshots descriptions)

3. **Configure environment variables:**
   
   Open `.env.local` and fill in your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 🔐 Admin Access

After setting up Firebase and creating an admin user:

1. Go to http://localhost:3000/admin
2. Login with your admin credentials
3. Start managing your school website!

**Default admin setup:**
- Create your admin user in Firebase Console → Authentication → Users
- Use that email/password to login

## 📁 Project Structure

```
school-website/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About page
│   │   ├── academics/         # Academics page
│   │   ├── admissions/        # Admissions page
│   │   ├── admin/             # Admin dashboard
│   │   ├── contact/           # Contact page
│   │   ├── events/            # Events page
│   │   ├── faculty/           # Faculty page
│   │   ├── gallery/           # Gallery page
│   │   └── mandatory-disclosure/
│   ├── components/            # React components
│   │   ├── admin/            # Admin components
│   │   ├── navbar.tsx        # Navigation bar
│   │   └── footer.tsx        # Footer
│   └── lib/
│       └── firebase.ts       # Firebase configuration
├── public/                    # Static files
├── .env.local                # Environment variables (create this)
├── FIREBASE_SETUP_GUIDE.md   # Detailed Firebase setup
├── QUICK_START.md            # Quick setup checklist
└── FIREBASE_VISUAL_GUIDE.md  # Visual Firebase guide
```

## 🎨 Customization

### Change School Name
Edit these files:
- `src/components/navbar.tsx` - Logo and name
- `src/components/footer.tsx` - Footer text
- `src/app/layout.tsx` - Page title and meta

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#2E1A47',    // Dark purple
  secondary: '#4CB5E6',  // Light blue
  accent: '#FBD106',     // Yellow
}
```

### Add School Logo
1. Add logo image to `public/` folder
2. Update navbar in `src/components/navbar.tsx`

### Update Contact Information
Edit `src/components/footer.tsx` and `src/app/contact/page.tsx`

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, stats, events |
| About | `/about` | School information, mission, vision |
| Academics | `/academics` | Programs, facilities, curriculum |
| Admissions | `/admissions` | Process, fees, inquiry form |
| Faculty | `/faculty` | Staff directory with filters |
| Events | `/events` | School events calendar |
| Gallery | `/gallery` | Photo gallery with categories |
| Contact | `/contact` | Contact form and map |
| Disclosures | `/mandatory-disclosure` | Document repository |
| Admin | `/admin` | Management dashboard (login required) |

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Firebase
  - Authentication (admin login)
  - Firestore (database)
  - Storage (file uploads)
- **Language**: TypeScript

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔒 Security

- Admin routes protected by Firebase Authentication
- Firestore security rules prevent unauthorized writes
- Storage rules protect file uploads
- Environment variables for sensitive data
- `.env.local` excluded from Git

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy!

### Important: Update Firebase Settings

After deployment, add your production domain to Firebase:
1. Firebase Console → Authentication → Settings
2. Add your domain to "Authorized domains"

## 📚 Documentation

- **FIREBASE_SETUP_GUIDE.md** - Complete Firebase setup instructions
- **QUICK_START.md** - Quick setup checklist
- **FIREBASE_VISUAL_GUIDE.md** - Visual guide with console navigation

## 🐛 Troubleshooting

### "Invalid API Key" Error
- Check `.env.local` has correct Firebase credentials
- Restart dev server after changing `.env.local`
- Verify values match Firebase Console

### Can't Login to Admin
- Verify user exists in Firebase Console → Authentication
- Check email/password are correct
- Ensure Email/Password auth is enabled

### Images Not Uploading
- Check Storage is enabled in Firebase
- Verify Storage rules are published
- Ensure you're logged in as admin

### Demo Data Showing
- Firebase not configured properly
- Check `.env.local` file exists and has values
- Restart dev server

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Firebase setup guides
3. Check browser console for errors (F12)
4. Verify Firebase Console for service status

## 📄 License

This project is open source and available for educational purposes.

## 🎓 Perfect For

- Schools and educational institutions
- Colleges and universities
- Training centers
- Educational organizations
- Any institution needing a content management system

---

**Made with ❤️ for education**

Start managing your school website today! Follow the setup guides and you'll be up and running in 15 minutes.
