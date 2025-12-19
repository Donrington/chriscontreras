# Deployment Guide - Christina Contreras Cleaning Website

## 🚀 Deployment Readiness Status

### ✅ Ready for Deployment
- [x] SEO metadata configured
- [x] robots.txt created
- [x] sitemap.xml configured
- [x] Contact form with email integration
- [x] Docker configuration
- [x] Environment variables setup
- [x] Production optimizations
- [x] Mobile responsive design
- [x] Performance optimized
- [x] Schema markup for rich snippets

### ⚠️ Before Going Live - UPDATE THESE

1. **Domain URLs** - Replace placeholder URLs with your actual domain:
   - `app/layout.tsx` (line 52)
   - `app/sitemap.ts` (line 4)
   - `public/robots.txt` (line 7)
   - `components/local-business-schema.tsx` (multiple locations)

2. **Business Information** in `components/local-business-schema.tsx`:
   - Phone number
   - Street address
   - City, State, ZIP
   - Latitude/Longitude coordinates
   - Business hours
   - Social media URLs

3. **Environment Variables**:
   - Ensure `.env.local` is NOT committed to Git (already in .gitignore)
   - Set `RESEND_API_KEY` on your hosting platform

4. **Google Search Console**:
   - Get verification code
   - Update `app/layout.tsx` line 91

---

## 🐳 Docker Deployment

### Prerequisites
- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (included with Docker Desktop)

### Option 1: Using Docker Compose (Recommended)

**1. Build and run the container:**
```bash
docker-compose up -d --build
```

**2. Check if running:**
```bash
docker-compose ps
```

**3. View logs:**
```bash
docker-compose logs -f web
```

**4. Stop the container:**
```bash
docker-compose down
```

**5. Access the website:**
- Open browser: http://localhost:3000

### Option 2: Using Docker CLI

**1. Build the image:**
```bash
docker build -t christina-cleaning:latest .
```

**2. Run the container:**
```bash
docker run -d \
  --name christina-cleaning \
  -p 3000:3000 \
  --env-file .env.local \
  --restart unless-stopped \
  christina-cleaning:latest
```

**3. Check if running:**
```bash
docker ps
```

**4. View logs:**
```bash
docker logs -f christina-cleaning
```

**5. Stop the container:**
```bash
docker stop christina-cleaning
docker rm christina-cleaning
```

---

## ☁️ Cloud Platform Deployment

### Option A: Vercel (Recommended - Easiest)

**Best for:** Next.js apps (built by Vercel), zero config

**Steps:**
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variable:
   - `RESEND_API_KEY` = `re_6jYMDodD_9jwLNxxhAr8LeCvPLRgHDaS4`
5. Click "Deploy"
6. Done! You get:
   - Free SSL certificate
   - Global CDN
   - Automatic deployments on git push
   - Free domain: `yourproject.vercel.app`
   - Can add custom domain

**Cost:** FREE for personal/small business

**Pros:**
- Zero configuration needed
- Best Next.js performance
- Automatic HTTPS
- Preview deployments
- Edge network

**Cons:**
- Locked into Vercel ecosystem

---

### Option B: Netlify

**Best for:** Static sites and JAMstack

**Steps:**
1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Connect repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variable: `RESEND_API_KEY`
6. Deploy

**Cost:** FREE for personal projects

**Pros:**
- Easy deployment
- Free SSL
- Good performance
- Generous free tier

**Cons:**
- Not as optimized for Next.js as Vercel

---

### Option C: Docker on Cloud VM (AWS, DigitalOcean, Azure)

**Best for:** Full control, existing infrastructure

#### DigitalOcean Droplet (Example)

**1. Create a Droplet:**
- Go to [DigitalOcean](https://digitalocean.com)
- Create Droplet (Ubuntu 22.04)
- Size: $6/month (1GB RAM) is sufficient
- Enable monitoring

**2. SSH into your server:**
```bash
ssh root@your-server-ip
```

**3. Install Docker:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

**4. Install Docker Compose:**
```bash
apt-get update
apt-get install docker-compose-plugin
```

**5. Clone your repository:**
```bash
git clone https://github.com/yourusername/website-cleaning-concept.git
cd website-cleaning-concept
```

**6. Create .env.local file:**
```bash
nano .env.local
```
Add:
```
RESEND_API_KEY=re_6jYMDodD_9jwLNxxhAr8LeCvPLRgHDaS4
```

**7. Build and run:**
```bash
docker-compose up -d --build
```

**8. Install Nginx (reverse proxy):**
```bash
apt-get install nginx certbot python3-certbot-nginx
```

**9. Configure Nginx:**
```bash
nano /etc/nginx/sites-available/christina-cleaning
```

Add:
```nginx
server {
    listen 80;
    server_name christinacontrerascleaning.com www.christinacontrerascleaning.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**10. Enable site:**
```bash
ln -s /etc/nginx/sites-available/christina-cleaning /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

**11. Get SSL certificate (HTTPS):**
```bash
certbot --nginx -d christinacontrerascleaning.com -d www.christinacontrerascleaning.com
```

**12. Auto-renewal (automatic):**
```bash
certbot renew --dry-run
```

**Cost:** $6-12/month

**Pros:**
- Full control
- Can host multiple apps
- Predictable pricing
- Root access

**Cons:**
- More setup required
- You manage updates/security
- Need to configure SSL manually

---

### Option D: AWS (Amazon Web Services)

#### Using AWS Elastic Beanstalk

**Steps:**
1. Install AWS CLI and EB CLI
2. Initialize Elastic Beanstalk:
```bash
eb init -p docker christina-cleaning
```
3. Create environment:
```bash
eb create production
```
4. Set environment variable:
```bash
eb setenv RESEND_API_KEY=re_6jYMDodD_9jwLNxxhAr8LeCvPLRgHDaS4
```
5. Deploy:
```bash
eb deploy
```

**Cost:** ~$10-30/month (pay for what you use)

---

### Option E: Railway

**Best for:** Quick Docker deployments

**Steps:**
1. Go to [Railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select repository
4. Add environment variable: `RESEND_API_KEY`
5. Railway auto-detects Dockerfile
6. Deploy

**Cost:** FREE $5 credit/month, then pay-as-you-go

**Pros:**
- Dead simple
- Auto-deploys on git push
- Good for Docker
- Free SSL

---

## 🔐 Security Checklist

Before deployment:

- [x] `.env.local` is in `.gitignore` (NEVER commit secrets!)
- [x] Environment variables set on hosting platform
- [ ] SSL certificate enabled (HTTPS)
- [ ] Update default Next.js security headers
- [ ] Rate limiting on contact form (optional but recommended)
- [ ] CORS configured if needed
- [ ] Production error logging set up

---

## 📊 Post-Deployment Checklist

After going live:

### Day 1:
- [ ] Verify site loads with HTTPS
- [ ] Test contact form
- [ ] Check all images load
- [ ] Test on mobile device
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for homepage

### Week 1:
- [ ] Set up Google Analytics (optional)
- [ ] Create Google My Business listing
- [ ] Monitor contact form submissions
- [ ] Check for errors in logs
- [ ] Run PageSpeed Insights test

### Week 2-4:
- [ ] Monitor Google Search Console for indexing
- [ ] Check for crawl errors
- [ ] Get first customer reviews
- [ ] Monitor uptime

---

## 🔄 CI/CD - Automatic Deployments

### GitHub Actions (for Docker deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Build Docker image
      run: docker build -t christina-cleaning:latest .

    - name: Deploy to server
      run: |
        # Add your deployment commands here
        # Example: scp, rsync, or cloud CLI commands
```

---

## 🆘 Troubleshooting

### Docker Issues

**Problem:** Container won't start
```bash
# Check logs
docker logs christina-cleaning

# Common fix: Rebuild
docker-compose down
docker-compose up --build -d
```

**Problem:** Port 3000 already in use
```bash
# Find what's using port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux

# Kill the process or use different port in docker-compose.yml
```

**Problem:** Environment variables not working
```bash
# Verify .env.local exists and is loaded
docker exec christina-cleaning env | grep RESEND
```

### Deployment Issues

**Problem:** Site shows 404
- Check build completed successfully
- Verify all files copied correctly
- Check Nginx/proxy configuration

**Problem:** Images not loading
- Verify image paths are correct
- Check public folder is deployed
- Check image optimization settings

**Problem:** Contact form not sending emails
- Verify `RESEND_API_KEY` is set
- Check Resend dashboard for errors
- Check server logs for error messages

---

## 📈 Performance Monitoring

### Tools to use:

1. **Google Search Console** - SEO and indexing
2. **Google Analytics** - Traffic and user behavior
3. **Google PageSpeed Insights** - Performance scores
4. **UptimeRobot** - Uptime monitoring (free)
5. **Sentry** - Error tracking (optional)

---

## 💰 Cost Comparison

| Platform | Monthly Cost | Best For | SSL | CDN |
|----------|-------------|----------|-----|-----|
| Vercel | FREE | Next.js apps | ✅ | ✅ |
| Netlify | FREE | Static sites | ✅ | ✅ |
| Railway | $5 credit | Docker apps | ✅ | ✅ |
| DigitalOcean | $6-12 | Full control | Manual | ❌ |
| AWS | $10-30 | Enterprise | ✅ | ✅ |
| Cloudflare Pages | FREE | Static sites | ✅ | ✅ |

---

## 🎯 Recommended Deployment Path

**For beginners/small business:**
1. **Start with Vercel** (free, easiest, best for Next.js)
2. If you outgrow it → Railway or DigitalOcean
3. If you need enterprise features → AWS

**For Docker enthusiasts:**
1. **Local testing:** Docker Compose
2. **Production:** Railway or DigitalOcean Droplet
3. **Scale up:** AWS ECS or Kubernetes

---

## ✅ You're Ready When:

- [ ] All placeholder URLs replaced with real domain
- [ ] Business info updated in schema
- [ ] Google Search Console set up
- [ ] Environment variables configured on hosting
- [ ] SSL certificate enabled
- [ ] Contact form tested
- [ ] Site tested on mobile

---

## 🚀 Quick Start Commands

**Local Docker testing:**
```bash
# Build and run
docker-compose up -d --build

# Access
http://localhost:3000

# Stop
docker-compose down
```

**Deploy to Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Deploy to server:**
```bash
# SSH to server
ssh user@yourserver.com

# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

---

## 📞 Support

If you run into issues:
1. Check logs: `docker-compose logs -f`
2. Review this guide
3. Check hosting platform documentation
4. Google the specific error message

---

**Your website is containerized and ready for deployment!** 🎉

Choose your deployment method above and follow the steps. Vercel is recommended for the easiest experience.
