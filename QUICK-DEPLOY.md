# Quick Deploy Reference

## 🎯 Fastest Path to Production

### Option 1: Vercel (Recommended - 5 minutes)
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to vercel.com
# 3. Import GitHub repository
# 4. Add environment variable:
#    RESEND_API_KEY = re_6jYMDodD_9jwLNxxhAr8LeCvPLRgHDaS4
# 5. Click Deploy
# Done! ✅
```

---

### Option 2: Docker (Local/Server)
```bash
# Build and run
docker-compose up -d --build

# Access at http://localhost:3000

# Stop
docker-compose down
```

---

## ⚠️ BEFORE Going Live

### Must Update (5 items):

1. **app/layout.tsx** line 52
   ```typescript
   url: "https://YOUR-ACTUAL-DOMAIN.com",
   ```

2. **app/sitemap.ts** line 4
   ```typescript
   const baseUrl = 'https://YOUR-ACTUAL-DOMAIN.com'
   ```

3. **public/robots.txt** line 7
   ```
   Sitemap: https://YOUR-ACTUAL-DOMAIN.com/sitemap.xml
   ```

4. **components/local-business-schema.tsx**
   - Phone number (line 11)
   - Address (lines 15-19)
   - Coordinates (lines 22-23)
   - Hours (lines 26-37)

5. **Environment Variable on hosting:**
   ```
   RESEND_API_KEY=re_6jYMDodD_9jwLNxxhAr8LeCvPLRgHDaS4
   ```

---

## 📋 Post-Deployment (Day 1)

1. ✅ Test site loads with HTTPS
2. ✅ Test contact form
3. ✅ Go to [Google Search Console](https://search.google.com/search-console)
4. ✅ Add property and verify
5. ✅ Submit sitemap: `yoursite.com/sitemap.xml`
6. ✅ Create [Google My Business](https://business.google.com)

---

## 🐳 Docker Commands Cheat Sheet

```bash
# Build
docker-compose build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build

# Stop
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Check status
docker-compose ps

# Shell into container
docker exec -it christina-cleaning-web sh
```

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Domain URLs updated (5 locations)
- [ ] Business info updated in schema
- [ ] SSL enabled on hosting
- [ ] Environment variable set
- [ ] Site accessible via HTTPS
- [ ] Contact form tested
- [ ] Mobile tested
- [ ] Google Search Console set up
- [ ] Sitemap submitted

---

## 🚨 Common Issues

**Issue:** Docker build fails
```bash
# Clear cache and rebuild
docker-compose build --no-cache
```

**Issue:** Port 3000 in use
```bash
# Change port in docker-compose.yml to 3001:3000
```

**Issue:** Environment variables not working
```bash
# Check .env.local exists and restart container
docker-compose down
docker-compose up -d
```

**Issue:** Contact form not sending
- Verify RESEND_API_KEY is set correctly
- Check hosting platform environment variables
- Check email logs in Resend dashboard

---

## 📞 Need Help?

1. See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions
2. See [SEO-DEPLOYMENT-CHECKLIST.md](SEO-DEPLOYMENT-CHECKLIST.md) for SEO setup
3. Check Docker logs: `docker-compose logs -f`

---

**You're ready to deploy! 🚀**
