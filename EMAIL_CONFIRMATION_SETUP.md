# Email Confirmation Setup Guide

Send automatic confirmation emails when users submit the contact form!

## What This Does

When a user submits the contact form:
1. ✅ Form data is saved to Firestore
2. ✅ User receives a confirmation email from `vidyavikas440@gmail.com`
3. ✅ You can view all submissions in the admin panel (future feature)

## Setup Using EmailJS (Free & Easy)

EmailJS is a free service that sends emails without needing a backend server.

### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click **Sign Up** (top right)
3. Sign up with your email or Google account
4. Verify your email address

### Step 2: Add Email Service

1. After logging in, go to **Email Services** page
2. Click **Add New Service**
3. Choose **Gmail** (since you're using vidyavikas440@gmail.com)
4. Click **Connect Account**
5. Sign in with `vidyavikas440@gmail.com`
6. Allow EmailJS to send emails on your behalf
7. Give it a name like "School Contact Form"
8. Click **Create Service**
9. **Copy the Service ID** (looks like `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates** page
2. Click **Create New Template**
3. Use this template:

**Subject:**
```
Thank you for contacting Vidya Vikas International School
```

**Content:**
```
Dear {{to_name}},

Thank you for reaching out to Vidya Vikas International School!

We have received your enquiry regarding: {{subject}}

Your message:
{{message}}

Our team will review your enquiry and get back to you within 24-48 hours at this email address.

If you have any urgent questions, please feel free to call us at:
- Landline: 02554 299 105
- Mobile: +91 8767398384

Best regards,
Vidya Vikas International School
248/2, Near Jai Bajarang Oil Mill
Nilgavhan-Kashti Road, Bhaygaon

Email: vidyavikas440@gmail.com
```

4. Click **Save**
5. **Copy the Template ID** (looks like `template_xyz789`)

### Step 4: Get Public Key

1. Go to **Account** page (top right menu)
2. Find **Public Key** section
3. **Copy your Public Key** (looks like `abc123XYZ`)

### Step 5: Add to .env.local

Open your `.env.local` file and add these lines:

```env
# EmailJS Configuration (for contact form confirmation emails)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace with your actual IDs from steps above.

**Example:**
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abc123XYZ
```

### Step 6: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 7: Test It!

1. Go to `http://localhost:3000/contact`
2. Fill out the contact form
3. Submit it
4. Check the email address you entered - you should receive a confirmation email!

## Free Tier Limits

EmailJS free tier includes:
- **200 emails per month**
- **2 email services**
- **2 email templates**

This is perfect for a school website! If you need more, paid plans start at $7/month.

## Troubleshooting

### No email received

1. **Check spam folder** - confirmation emails might go to spam initially
2. **Check EmailJS dashboard** - see if email was sent
3. **Check browser console** (F12) - look for error messages
4. **Verify credentials** - make sure all IDs in `.env.local` are correct
5. **Restart dev server** - changes to `.env.local` require restart

### "Failed to send email" error

- Check that Gmail service is connected in EmailJS
- Verify Public Key is correct
- Make sure you're not exceeding free tier limits (200/month)

### Email sent but looks wrong

- Edit the template in EmailJS dashboard
- Make sure template variables match: `{{to_name}}`, `{{subject}}`, `{{message}}`
- Test the template using EmailJS's test feature

## Customization

### Change Email Content

1. Go to EmailJS dashboard → Email Templates
2. Click on your template
3. Edit the subject and content
4. Use these variables:
   - `{{to_name}}` - User's name
   - `{{to_email}}` - User's email
   - `{{subject}}` - Enquiry subject
   - `{{message}}` - User's message
   - `{{from_name}}` - Your school name
   - `{{reply_to}}` - Your school email

### Add Auto-Reply

The current setup sends a confirmation to the user. To also notify yourself:

1. Create a second template for admin notification
2. Add another EmailJS call in the contact form
3. Send to `vidyavikas440@gmail.com` with user's details

## Alternative: Gmail SMTP (Advanced)

If you prefer not to use EmailJS, you can set up Gmail SMTP:

1. Enable 2-factor authentication on Gmail
2. Generate an App Password
3. Use Nodemailer in a Next.js API route
4. Configure SMTP settings

This requires more setup but gives you more control.

## For Production

EmailJS works the same in production! No additional setup needed.

Just make sure your `.env.local` variables are added to your hosting platform's environment variables (Vercel, Netlify, etc.).

## Security Note

- EmailJS Public Key is safe to expose (it's meant for frontend)
- Never expose your EmailJS Private Key
- Rate limiting is handled by EmailJS
- Spam protection is built-in

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
