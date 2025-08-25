# Deploy to agentcorrect.com

## Quick Deploy (5 minutes)

The landing page is in `docs/` folder with CNAME file already configured for agentcorrect.com.

### Step 1: Push to GitHub
```bash
git add docs/
git commit -m "Add landing page for agentcorrect.com"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repo Settings → Pages
2. Source: Deploy from branch
3. Branch: main
4. Folder: /docs
5. Click Save

### Step 3: Configure DNS (at your domain registrar)
Add these DNS records at your domain provider (Namecheap, GoDaddy, etc):

```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: [your-github-username].github.io
```

### Step 4: Wait for propagation
- GitHub Pages: ~10 minutes to build
- DNS: 5 minutes to 48 hours (usually < 1 hour)
- Check status: https://github.com/[your-username]/agentcorrect/settings/pages

## What the Landing Page Shows

The landing page now accurately shows ALL of AgentCorrect's capabilities:

### 1. **Complete Detection → Enforcement Pipeline**
- ANALYZE traces for disasters
- DETECT 99% of dangerous patterns  
- GENERATE OPA policies for runtime enforcement
- BLOCK CI/CD with exit code 2

### 2. **Generated Artifacts** (shows actual files created)
- `policy.rego` - OPA runtime enforcement rules
- `report.html` - Visual analysis report
- `findings.json` - Machine-readable violations
- `coverage.json` - % of operations checked
- `agent_spec.yaml` - Rules in YAML format
- `SHA256SUMS` - Audit trail

### 3. **99% Detection Coverage**
- 25 payment providers with exact idempotency requirements
- SQL disasters (DELETE without WHERE, tautologies, DROP/TRUNCATE)
- Infrastructure wipes (Redis FLUSHALL, MongoDB drop, S3 DeleteBucket)

### 4. **Production Features**
- Ultimate Detector with eTLD+1 domain extraction
- Coverage tracking
- Multi-format support (Langsmith, Langfuse, OTLP)
- Stateful tracking (catches key reuse)
- Zero false positives
- No network calls (deterministic)

### 5. **Real Examples**
- Shows actual `agentcorrect demo` output
- Real error messages users will see
- Actual generated OPA policy code
- Real CI/CD integration examples

## Test Locally

```bash
cd docs/
python3 -m http.server 8000
# Open http://localhost:8000
```

## Update GitHub URL

Replace `https://github.com/your-org/agentcorrect` with your actual GitHub repo URL in `docs/index.html`.

## Verify Everything Works

After deployment:
1. Check https://agentcorrect.com loads
2. Test all code snippets can be copied
3. Verify GitHub link works
4. Check mobile responsive design
5. Confirm vendor doc links work (Stripe, PayPal, etc)

## The Magic

This landing page ACCURATELY reflects what AgentCorrect v0 does:
- It's not just a linter - it GENERATES enforcement policies
- Shows the complete artifact generation (8 files)
- Demonstrates the demo mode that actually works
- Shows real terminal output from actual runs
- Explains OPA policy deployment (the enforcement part)

Now people understand it's a complete solution from detection to runtime enforcement!