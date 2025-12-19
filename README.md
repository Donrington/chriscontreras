# Christina Contreras Cleaning - Website

Professional cleaning service website built with Next.js 16, featuring modern design, animations, and SEO optimization.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## ✨ Features

- 🎨 **Modern Design** - Beautiful UI with dark/light theme toggle
- 🚀 **High Performance** - Optimized for speed and SEO
- 📱 **Fully Responsive** - Perfect on all devices
- ✉️ **Contact Form** - Integrated email system with Resend
- 🎬 **Smooth Animations** - GSAP-powered interactions
- 🔍 **SEO Optimized** - Meta tags, sitemap, schema markup
- 🐳 **Docker Ready** - Easy deployment with containers
- ♿ **Accessible** - WCAG compliant

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d --build

# Access at http://localhost:3000

# Stop container
docker-compose down
```

## 📋 Pre-Deployment Checklist

Before deploying to production, update these files:

1. **Domain URLs** - Update in 4 locations:
   - `app/layout.tsx` (line 52)
   - `app/sitemap.ts` (line 4)
   - `public/robots.txt` (line 7)
   - `components/local-business-schema.tsx` (multiple)

2. **Business Information** - Update in `components/local-business-schema.tsx`:
   - Phone number
   - Physical address
   - Coordinates (get from Google Maps)
   - Business hours
   - Social media links

3. **Environment Variables** - Set on your hosting platform:
   ```
   RESEND_API_KEY=your_actual_api_key
   ```

4. **Google Verification** - Add code in `app/layout.tsx` (line 91)

## 📁 Project Structure

```
website-cleaning-concept/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   └── contact/        # Contact form endpoint
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── page-loader.tsx     # Loading animation
│   ├── navbar.tsx          # Navigation
│   ├── hero-*.tsx          # Hero section components
│   ├── *-section.tsx       # Page sections
│   ├── contact-form-modal.tsx
│   └── local-business-schema.tsx
├── public/                  # Static assets
│   ├── images/             # Images
│   ├── logos/              # Brand logos
│   ├── robots.txt          # Search engine rules
│   └── manifest.json       # PWA manifest
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose config
├── .dockerignore          # Docker ignore rules
└── .env.local             # Environment variables (not in git)
```

## 🛠️ Tech Stack

### Core
- **Next.js 16** - React framework
- **React 19.2** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS
- **Radix UI** - Accessible components
- **GSAP** - Animations

### Tools
- **Resend** - Email service
- **Zod** - Schema validation
- **Lucide React** - Icons
- **next-themes** - Theme switching

### Infrastructure
- **Docker** - Containerization
- **Vercel Analytics** - Performance monitoring

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📦 Deployment Options

### Option 1: Vercel (Recommended)
1. Push to GitHub
2. Import repo on [Vercel](https://vercel.com)
3. Add environment variable: `RESEND_API_KEY`
4. Deploy

**Pros:** Zero config, automatic HTTPS, global CDN, free

### Option 2: Docker (Any Cloud)
1. Build: `docker-compose build`
2. Deploy to cloud provider
3. Run: `docker-compose up -d`

**Supports:** AWS, DigitalOcean, Azure, Railway, etc.

### Option 3: Static Export
```bash
# Update next.config.mjs
output: 'export'

# Build
npm run build

# Deploy 'out' folder to any static host
```

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions.

## 🔐 Environment Variables

Create `.env.local` in root directory:

```env
RESEND_API_KEY=your_resend_api_key_here
```

**Never commit `.env.local` to version control!**

## 📊 SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (social sharing)
- ✅ Twitter Cards
- ✅ Schema.org structured data
- ✅ Sitemap.xml (auto-generated)
- ✅ robots.txt
- ✅ Mobile-friendly
- ✅ Fast loading
- ✅ Semantic HTML

## 🎨 Design System

### Colors
- **Primary:** `#1C4274` (Navy blue)
- **Accent:** `#F5E6CC` (Cream)
- **Background Light:** `#F4F7FA`
- **Background Dark:** `#0B1A2F`

### Fonts
- **Headings:** Allura (cursive)
- **Body:** Manrope (sans-serif)
- **Special:** Cornerstone (custom)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a private business website. For modifications:

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request

## 📄 License

Copyright © 2025 Christina Contreras Cleaning. All rights reserved.

## 📞 Support

For issues or questions:
- Check [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)
- Check [SEO-DEPLOYMENT-CHECKLIST.md](SEO-DEPLOYMENT-CHECKLIST.md)
- Review [QUICK-DEPLOY.md](QUICK-DEPLOY.md)

## 🎯 Post-Deployment Tasks

After going live:
1. Submit sitemap to Google Search Console
2. Create Google My Business listing
3. Set up Google Analytics (optional)
4. Monitor contact form submissions
5. Get customer reviews
6. Monitor site performance

---

**Built with ❤️ for Christina Contreras Cleaning**

Ready to deploy! 🚀
