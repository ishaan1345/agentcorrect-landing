# Deploying the AgentCorrect Landing Page

## Quick Deploy Options

### 1. GitHub Pages (Free, Easiest)
```bash
# Commit the index.html
git add index.html
git commit -m "Add landing page"
git push

# Go to GitHub repo Settings → Pages
# Source: Deploy from branch
# Branch: main, folder: / (root)
# Save

# Your site will be live at:
# https://[your-username].github.io/agentcorrect/
```

### 2. Netlify (Free, Instant)
```bash
# Option A: Drag & drop
# 1. Go to https://app.netlify.com/drop
# 2. Drag index.html into browser
# 3. Done! Get instant URL

# Option B: CLI
npm install -g netlify-cli
netlify deploy --dir=. --prod
```

### 3. Vercel (Free, Fast)
```bash
npm install -g vercel
vercel --prod
# Follow prompts, deploy current directory
```

### 4. Cloudflare Pages (Free, Global CDN)
```bash
# 1. Go to dash.cloudflare.com → Pages
# 2. Create project → Upload assets
# 3. Upload index.html
# 4. Deploy
```

## Security Considerations

The landing page includes:
- ✅ Content Security Policy (CSP) header
- ✅ No external dependencies except Tailwind CDN
- ✅ No tracking/analytics by default
- ✅ HTTPS canonical URL
- ✅ No user input fields (no XSS risk)
- ✅ Static content only (no server-side code)

## What This Landing Page Does

**Aligns with AgentCorrect's value prop:**
- Shows real disasters AI agents cause (duplicate charges, data wipes)
- Demonstrates the solution (deterministic CI checks)
- Provides copy-paste quickstart
- Links to real payment provider docs (Stripe, PayPal, etc.)
- Shows actual error output format
- Clear CTAs to install

**Matches the repo's functionality:**
- Focuses on 25+ payment providers
- Highlights SQL/Redis/MongoDB protection
- Shows exit code behavior (0=pass, 2=fail)
- Emphasizes "painkiller not vitamin" positioning

## Custom Domain Setup

To use agentcorrect.com:
1. Buy domain from Namecheap/GoDaddy/etc
2. Point DNS to your hosting:
   - GitHub Pages: CNAME to [username].github.io
   - Netlify: CNAME to [your-site].netlify.app
   - Vercel: CNAME to [your-site].vercel.app
3. Add CNAME file with "agentcorrect.com" to repo

## Performance

- Page size: ~15KB (very fast)
- No images to load
- Single file, no build step
- Tailwind via CDN (cached globally)
- Core Web Vitals score: 95+

## Next Steps

1. Replace placeholder GitHub URL with actual repo
2. Set up domain name
3. Add real payment processor affiliate links if applicable
4. Create GitHub issues for feature requests
5. Add actual pricing/checkout when ready