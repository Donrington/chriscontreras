# Render Static Site Deployment Guide

## 🚀 Deploy as Static Site (Simpler & Faster!)

### Why Static?
- ✅ Faster deployment (no Docker build)
- ✅ Lower resource usage
- ✅ Free tier works great
- ✅ Instant page loads
- ⚠️ Contact form API still works!

---

## 📋 STEP 1: Update Next.js Config for Static Export

### Update `next.config.mjs`

Change from:
```javascript
output: 'standalone',
```

To:
```javascript
output: 'export',
```

**I'll do this for you now!**

---

## 🚀 STEP 2: Deploy to Render

### A. Push to GitHub

```bash
git add .
git commit -m "Static site deployment for Render"
git push origin main
```

### B. Create Render Static Site

1. **Go to [Render.com](https://render.com)**
2. **Sign up** with GitHub
3. **Click "New +"** → Select **"Static Site"**
4. **Connect repository:** `website-cleaning-concept`

### C. Configure Static Site

| Setting | Value |
|---------|-------|
| **Name** | `christina-cleaning` |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `out` |

### D. Environment Variables

⚠️ **IMPORTANT:** For static sites, API routes need special handling!

**Option 1 - Serverless Functions (Recommended):**
We'll need to set up API routes separately (see below)

**Option 2 - Use External Email Service:**
Contact form can use a third-party service like Formspree

---

## ⚠️ API Routes Issue with Static Export

### The Problem:
Next.js static export **does NOT support API routes** (like `/api/contact`)

### Solutions:

#### **Solution A: Use Render Web Service for API (Hybrid)**

1. **Deploy main site as Static Site** (as above)
2. **Deploy API separately as Web Service:**
   - Create another Render Web Service
   - Use same repository
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment variable: `RESEND_API_KEY`
   - Update contact form to point to this service

#### **Solution B: Use Formspree (Easiest)**

1. Go to [Formspree.io](https://formspree.io)
2. Create free account
3. Get form endpoint
4. Update contact form to POST to Formspree
5. No API route needed!

#### **Solution C: Deploy as Web Service Instead (Recommended)**

Deploy as a **Web Service** (not static) on Render - simpler!

---

## ✅ RECOMMENDED: Deploy as Web Service (NOT Static)

### This is actually simpler! Here's why:

**Web Service (Node.js):**
- ✅ API routes work (contact form works)
- ✅ No static export needed
- ✅ Still fast (Next.js is optimized)
- ✅ Free tier available
- ✅ Easy deployment

**Let me show you the correct way:**

---

## 🎯 CORRECT DEPLOYMENT: Render Web Service (Node.js)

### STEP 1: Update `next.config.mjs`

Change to:
```javascript
output: 'standalone',  // NOT 'export'
```

### STEP 2: Deploy Web Service

1. **Go to Render.com**
2. **New + → Web Service**
3. **Connect repository**

**Configure:**

| Setting | Value |
|---------|-------|
| **Name** | `christina-cleaning` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

### STEP 3: Environment Variables

Add this:
```
RESEND_API_KEY=re_6jYMDodD_9jwLNxxhAr8LeCvPLRgHDaS4
```

### STEP 4: Deploy!

Click "Create Web Service" - Done!

---

## 🌐 Connect Custom Domain

Same as before:

### In Render:
1. Settings → Custom Domains
2. Add:
   - `chriscontrerascleaning.com`
   - `www.chriscontrerascleaning.com`

### In Namecheap:
1. Advanced DNS
2. Add records:

```
Type    Host    Value
A       @       [Render's IP]
CNAME   www     christina-cleaning.onrender.com
```

---

## 🔒 SSL Certificate

**Automatic and FREE!**
- Activates after DNS propagates
- Usually 30 minutes
- No configuration needed

---

## ✅ Quick Comparison

### Static Site:
- ❌ API routes don't work
- ❌ Contact form needs workaround
- ✅ Slightly faster
- ⚠️ More complex setup

### Web Service (Node.js):
- ✅ Everything works out of the box
- ✅ API routes work (contact form works)
- ✅ Easy setup
- ✅ Still very fast
- ✅ **RECOMMENDED**

---

## 🎯 My Recommendation: Use Web Service

**Deploy as Node.js Web Service because:**

1. ✅ Contact form works immediately
2. ✅ No extra configuration needed
3. ✅ One-click deployment
4. ✅ Free tier available
5. ✅ Fast enough for business site

**Avoid static export unless you:**
- Don't need API routes
- Want to use external form service
- Have specific static hosting requirements

---

## 📋 Final Steps (Web Service Method)

### 1. Push to GitHub:
```bash
git add .
git commit -m "Production ready for Render"
git push origin main
```

### 2. Create Render Web Service:
- Runtime: **Node**
- Build: `npm install && npm run build`
- Start: `npm start`
- Env: `RESEND_API_KEY=re_6jYMDodD_9jwLNxxhAr8LeCvPLRgHDaS4`

### 3. Add Custom Domain:
- Render: Add `chriscontrerascleaning.com` and `www.chriscontrerascleaning.com`
- Namecheap: Add A and CNAME records

### 4. Wait for DNS & SSL:
- 30 minutes - 24 hours
- Check: https://whatsmydns.net

### 5. Go Live! 🎉

---

## 💰 Pricing

**Free Tier:**
- ✅ Enough for most small business sites
- ⚠️ Spins down after 15 min (slow first load)

**Starter $7/month:**
- ✅ Always on
- ✅ No cold starts
- ✅ Better for customers
- **Recommended for production**

---

## 🆘 Support

See main deployment guide: [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md)

---

## ✅ You're Ready!

**Use Web Service deployment (NOT static) for easiest setup!**

Your contact form will work perfectly, and deployment is simple. 🚀
