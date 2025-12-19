# Render Deployment Guide - Christina Contreras Cleaning

## 🎯 Complete Deployment Checklist

### Your Setup:
- **Platform:** Render.com
- **Domain:** chriscontrerascleaning.com (Namecheap)
- **Framework:** Next.js 16
- **Deployment:** Docker

---

## 📋 STEP 1: Pre-Deployment Updates (5 minutes)

Before deploying, update these files with your actual domain:

### 1. Update `app/layout.tsx` (Line 52)
```typescript
url: "https://chriscontrerascleaning.com",
```

### 2. Update `app/sitemap.ts` (Line 4)
```typescript
const baseUrl = 'https://chriscontrerascleaning.com'
```

### 3. Update `public/robots.txt` (Line 7)
```
Sitemap: https://chriscontrerascleaning.com/sitemap.xml
```

### 4. Update `components/local-business-schema.tsx`
Update all URLs from `https://christinacontrerascleaning.com` to `https://chriscontrerascleaning.com`

---

## 🚀 STEP 2: Deploy to Render (10 minutes)

### A. Push Code to GitHub

```bash
# Commit all changes
git add .
git commit -m "Ready for Render deployment with custom domain"
git push origin main
```

### B. Create Render Account & Web Service

1. **Go to [Render.com](https://render.com)**
2. **Sign up** using your GitHub account
3. **Click "New +"** → Select **"Web Service"**
4. **Connect your GitHub repository:**
   - Search for: `website-cleaning-concept`
   - Click "Connect"

### C. Configure Web Service

**Fill in these settings:**

| Setting | Value |
|---------|-------|
| **Name** | `christina-cleaning` |
| **Region** | Oregon (US West) or Ohio (US East) |
| **Branch** | `main` |
| **Runtime** | `Docker` |
| **Instance Type** | Free (or Starter $7/month for better performance) |

**IMPORTANT - Build Settings:**
- ✅ Render will auto-detect Dockerfile
- ✅ Leave "Docker Command" empty (uses CMD from Dockerfile)

### D. Add Environment Variable

**CRITICAL:** Add this environment variable:

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | `re_6jYMDodD_9jwLNxxhAr8LeCvPLRgHDaS4` |

**Steps:**
1. Scroll to "Environment" section
2. Click "Add Environment Variable"
3. Add the key-value pair above
4. Click "Save"

### E. Deploy!

1. **Click "Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Render will give you a URL like: `https://christina-cleaning.onrender.com`
4. Test this URL first before adding custom domain

---

## 🌐 STEP 3: Connect Custom Domain (15 minutes)

### A. In Render Dashboard

1. **Go to your Web Service** (`christina-cleaning`)
2. **Click "Settings" tab**
3. **Scroll to "Custom Domains"**
4. **Click "Add Custom Domain"**
5. **Add BOTH:**
   - `chriscontrerascleaning.com`
   - `www.chriscontrerascleaning.com`

**Render will show you DNS records to add**

---

## 🔧 STEP 4: Configure Namecheap DNS (10 minutes)

### A. Log into Namecheap

1. Go to [Namecheap.com](https://namecheap.com)
2. Sign in
3. Go to "Domain List"
4. Click "Manage" next to `chriscontrerascleaning.com`

### B. Add DNS Records

**Click "Advanced DNS" tab**

**Delete any existing A/CNAME records for @ and www first!**

**Then add these records:**

#### For Root Domain (chriscontrerascleaning.com):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **A Record** | `@` | `216.24.57.1` | Automatic |

#### For WWW Subdomain (www.chriscontrerascleaning.com):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **CNAME Record** | `www` | `christina-cleaning.onrender.com` | Automatic |

**⚠️ IMPORTANT:**
- The A Record IP address might be different. **Use the IP that Render shows you in the Custom Domains section!**
- Render will display the exact IP when you add the custom domain

### C. Example Configuration

Your Namecheap DNS should look like this:

```
Type    Host    Value                              TTL
----    ----    -----                              ---
A       @       216.24.57.1                        Automatic
CNAME   www     christina-cleaning.onrender.com    Automatic
```

**Save all changes!**

---

## 🔒 STEP 5: SSL Certificate (Automatic - FREE!)

### Render Handles SSL Automatically!

**What happens:**
1. After DNS propagates (15 min - 24 hours)
2. Render automatically provisions a **FREE Let's Encrypt SSL certificate**
3. Your site will be available at `https://chriscontrerascleaning.com`
4. HTTP → HTTPS redirect is automatic

**Check SSL Status:**
- In Render Dashboard → Custom Domains section
- You'll see "Certificate Status: Active" when ready
- Usually takes 30 minutes after DNS propagates

**No action needed from you! Render does it all.**

---

## ⏱️ STEP 6: Wait for DNS Propagation (15 min - 24 hours)

### DNS propagation time:
- **Typically:** 15-30 minutes
- **Maximum:** 24 hours

### Check if DNS is working:

**Option 1 - Online Tool:**
1. Go to [whatsmydns.net](https://www.whatsmydns.net/)
2. Enter: `chriscontrerascleaning.com`
3. Select "A" record type
4. Click Search
5. Green checkmarks = DNS propagated

**Option 2 - Command Line:**
```bash
# Check A record
nslookup chriscontrerascleaning.com

# Check CNAME for www
nslookup www.chriscontrerascleaning.com
```

**What you should see:**
```
chriscontrerascleaning.com → 216.24.57.1 (Render's IP)
www.chriscontrerascleaning.com → christina-cleaning.onrender.com
```

---

## ✅ STEP 7: Verify Everything Works

### Checklist:

- [ ] `https://christina-cleaning.onrender.com` works (Render URL)
- [ ] `https://chriscontrerascleaning.com` works (your domain)
- [ ] `https://www.chriscontrerascleaning.com` works (www subdomain)
- [ ] `http://chriscontrerascleaning.com` redirects to HTTPS
- [ ] Contact form sends emails
- [ ] SSL certificate shows (padlock 🔒 in browser)
- [ ] All images load
- [ ] Site is fast and responsive

### Test Contact Form:
1. Go to your live site
2. Click "Get a Quote" or contact button
3. Fill out form
4. Submit
5. Check email: christinacontrerascleaning@gmail.com

---

## 🔄 STEP 8: Post-Deployment Tasks

### A. Update Deployment Documentation

Update these files with actual domain:
- `README.md`
- `DEPLOYMENT-GUIDE.md`
- `SEO-DEPLOYMENT-CHECKLIST.md`

### B. Set Up Google Search Console

1. **Go to [Google Search Console](https://search.google.com/search-console)**
2. **Add property:** `chriscontrerascleaning.com`
3. **Verify ownership:** HTML tag method
4. **Get verification code**
5. **Add to `app/layout.tsx` line 90:**
   ```typescript
   verification: {
     google: "paste-your-actual-code-here",
   }
   ```
6. **Redeploy** (git push triggers auto-deploy on Render)
7. **Submit sitemap:** `https://chriscontrerascleaning.com/sitemap.xml`

### C. Create Google My Business

1. **Go to [Google Business](https://business.google.com)**
2. **Create business profile**
3. **Fill in:**
   - Business name: Christina Contreras Cleaning
   - Category: Cleaning Service
   - Website: https://chriscontrerascleaning.com
   - Phone number
   - Service area
4. **Verify business** (Google sends postcard)
5. **Add photos of your work**
6. **Get customer reviews!**

### D. Set Up Google Analytics (Optional)

1. **Go to [Google Analytics](https://analytics.google.com)**
2. **Create property** for your website
3. **Get Measurement ID** (G-XXXXXXXXXX)
4. **Add to site** (instructions in Google Analytics)

---

## 🚨 Common Issues & Solutions

### Issue 1: "Site can't be reached" after 24 hours

**Solution:**
```bash
# Check DNS propagation
nslookup chriscontrerascleaning.com

# If still showing old IP:
1. Clear DNS cache on your computer
2. Try from different network (mobile data)
3. Check Namecheap DNS records are correct
```

### Issue 2: SSL Certificate not activating

**Causes:**
- DNS not fully propagated yet
- Wrong DNS records

**Solution:**
1. Wait 1-2 hours after DNS propagates
2. In Render → Custom Domains → Click "Refresh"
3. Check DNS records are exactly as Render specifies

### Issue 3: Build fails on Render

**Solution:**
```bash
# Check Render build logs
# Common fixes:
1. Ensure Dockerfile is in root directory
2. Check .dockerignore doesn't exclude important files
3. Verify environment variables are set
```

### Issue 4: Contact form not sending emails

**Solution:**
1. Check `RESEND_API_KEY` is set in Render environment variables
2. Check Resend dashboard for error logs
3. Verify email recipient in `app/api/contact/route.ts` is correct

### Issue 5: Images not loading

**Solution:**
1. Check images are in `public/` folder
2. Verify paths start with `/` (e.g., `/logos/logo.png`)
3. Check Docker build includes public folder
4. Clear browser cache (Ctrl+Shift+Delete)

---

## 💰 Render Pricing

### Free Tier:
- ✅ Perfect for getting started
- ✅ Free SSL certificate
- ✅ Free custom domain
- ⚠️ Spins down after 15 min of inactivity (cold starts)
- ⚠️ 750 hours/month limit (enough for one service)

### Starter Tier ($7/month):
- ✅ Always on (no cold starts)
- ✅ Faster
- ✅ Better for production
- ✅ 24/7 uptime
- **Recommended for business website**

### Recommendation:
Start with **FREE** tier to test, upgrade to **Starter ($7/month)** before going live to customers.

---

## 🔄 Automatic Deployments

**Render auto-deploys when you push to GitHub!**

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Update website content"
git push origin main

# Render automatically:
# 1. Detects push
# 2. Builds new Docker image
# 3. Deploys automatically
# 4. Live in ~5 minutes!
```

---

## 📊 Monitoring

### Render Dashboard Shows:

- **Deploy logs** - See build process
- **Runtime logs** - See server errors
- **Metrics** - CPU, memory usage
- **Events** - Deploy history

**Access logs:**
1. Go to Render dashboard
2. Click your service
3. Click "Logs" tab

---

## 🎯 Final Checklist

### Before Going Live:

- [ ] All domain URLs updated in code (4 files)
- [ ] Code pushed to GitHub
- [ ] Render web service created
- [ ] Environment variable `RESEND_API_KEY` added
- [ ] Custom domain added in Render
- [ ] DNS records added in Namecheap (A + CNAME)
- [ ] DNS propagated (check whatsmydns.net)
- [ ] SSL certificate active (green padlock)
- [ ] All 4 URLs work (http/https, with/without www)
- [ ] Contact form tested
- [ ] Mobile tested
- [ ] Google Search Console set up
- [ ] Sitemap submitted

### After Going Live:

- [ ] Google My Business created
- [ ] Get customer reviews
- [ ] Monitor contact form submissions
- [ ] Check Render logs occasionally
- [ ] Consider upgrading to Starter tier ($7/month)

---

## 🆘 Need Help?

**Render Support:**
- Dashboard → Help icon → Community forum
- [Render Docs](https://render.com/docs)
- [Render Status](https://status.render.com)

**Namecheap Support:**
- Live chat available 24/7
- [Namecheap Help Center](https://www.namecheap.com/support/)

**DNS Issues:**
- [whatsmydns.net](https://www.whatsmydns.net/) - Check propagation
- [dnschecker.org](https://dnschecker.org/) - Global DNS check

---

## 📞 Quick Reference

**Your URLs:**
- Production: `https://chriscontrerascleaning.com`
- WWW: `https://www.chriscontrerascleaning.com`
- Render URL: `https://christina-cleaning.onrender.com`

**DNS Records:**
```
Type    Host    Value
A       @       [Render's IP - check dashboard]
CNAME   www     christina-cleaning.onrender.com
```

**Environment Variables:**
```
RESEND_API_KEY=re_6jYMDodD_9jwLNxxhAr8LeCvPLRgHDaS4
```

---

## 🚀 You're Ready!

Follow this guide step-by-step and your website will be live on your custom domain with FREE SSL in about 30-60 minutes!

**Good luck with your deployment! 🎉**
