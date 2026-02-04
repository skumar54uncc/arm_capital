# Deployment Guide for ARM Capital Website

## ✅ Code Pushed to GitHub

Your code has been successfully pushed to: https://github.com/skumar54uncc/arm_capital

## 🔓 Making Repository Public (For Demo)

### Step 1: Make Repository Public on GitHub

1. Go to your repository: https://github.com/skumar54uncc/arm_capital
2. Click on **Settings** (top right of the repository page)
3. Scroll down to the **Danger Zone** section at the bottom
4. Click **Change visibility**
5. Select **Make public**
6. Type the repository name to confirm: `skumar54uncc/arm_capital`
7. Click **I understand, change repository visibility**

Your repository is now public and can be viewed by anyone!

---

## 🚀 Deploying for Demo (Recommended: Vercel)

### Option 1: Vercel (Recommended - Free & Fast)

1. **Sign up/Login to Vercel:**
   - Go to https://vercel.com
   - Sign up with your GitHub account (recommended)

2. **Import Your Repository:**
   - Click **Add New Project**
   - Select **Import Git Repository**
   - Find `skumar54uncc/arm_capital` and click **Import**

3. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Environment Variables (Optional):**
   - If you have a Mapbox token, add it:
     - Key: `NEXT_PUBLIC_MAPBOX_TOKEN`
     - Value: `your_mapbox_token_here`

5. **Deploy:**
   - Click **Deploy**
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `https://arm-capital-xxxxx.vercel.app`
   - You can add a custom domain later if needed

### Option 2: Netlify (Alternative)

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click **Add new site** → **Import an existing project**
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click **Deploy site**

---

## 📋 Quick Deployment Checklist

- [x] Code pushed to GitHub
- [ ] Repository made public (follow steps above)
- [ ] Deployed to Vercel/Netlify
- [ ] Tested live site
- [ ] Shared demo link with team

---

## 🔗 Sharing Your Demo

Once deployed, you'll get a live URL like:
- Vercel: `https://arm-capital.vercel.app` (or custom domain)
- Netlify: `https://arm-capital.netlify.app` (or custom domain)

Share this URL with your team for the demo!

---

## 🔄 Updating the Site

After making changes:

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. **Auto-deployment:**
   - Vercel/Netlify will automatically rebuild and deploy
   - Changes go live in 2-3 minutes

---

## 📝 Notes

- **Team Photos:** Make sure team photos are in `public/images/` folder
- **Mapbox Token:** Optional - site works without it (uses SVG fallback)
- **Environment Variables:** Add any sensitive keys in Vercel/Netlify dashboard, not in code

---

## 🆘 Troubleshooting

**Build fails?**
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18+ in Vercel settings

**Site not loading?**
- Check build logs in Vercel/Netlify dashboard
- Verify all environment variables are set

**Need help?**
- Check Vercel docs: https://vercel.com/docs
- Check Netlify docs: https://docs.netlify.com
