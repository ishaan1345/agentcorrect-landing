#!/bin/bash

# AgentCorrect - GitHub Repository Setup Script
# Run this after creating the repo on GitHub

echo "==================================="
echo "AgentCorrect GitHub Setup"
echo "==================================="

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI not found. Please install it first:"
    echo "  Mac: brew install gh"
    echo "  Linux: https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
    echo "  Windows: winget install --id GitHub.cli"
    exit 1
fi

# Authenticate if needed
gh auth status &>/dev/null
if [ $? -ne 0 ]; then
    echo "Please authenticate with GitHub:"
    gh auth login
fi

# Get GitHub username
GITHUB_USER=$(gh api user --jq .login)
echo "GitHub user: $GITHUB_USER"

# Create the repository
echo "Creating repository..."
gh repo create agentcorrect \
    --public \
    --description "CI/CD guardrails that prevent AI agents from charging customers twice. Catches missing Stripe idempotency, SQL without WHERE, Redis FLUSHALL." \
    --homepage "https://agentcorrect.com" \
    --confirm

if [ $? -eq 0 ]; then
    echo "✅ Repository created successfully!"
else
    echo "Repository might already exist, continuing..."
fi

# Add remote
echo "Adding remote..."
git remote add origin "https://github.com/$GITHUB_USER/agentcorrect.git" 2>/dev/null || \
git remote set-url origin "https://github.com/$GITHUB_USER/agentcorrect.git"

# Update landing page with correct GitHub URL
echo "Updating landing page with GitHub URL..."
sed -i "s|https://github.com/ishaan-jaff/agentcorrect|https://github.com/$GITHUB_USER/agentcorrect|g" docs/index.html
sed -i "s|https://github.com/your-org/agentcorrect|https://github.com/$GITHUB_USER/agentcorrect|g" docs/index.html

# Commit the URL update
git add docs/index.html
git commit -m "Update GitHub URLs in landing page" 2>/dev/null || echo "No changes to commit"

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed successfully!"
else
    echo "❌ Push failed. You may need to run:"
    echo "   git push -u origin main --force"
fi

# Enable GitHub Pages
echo ""
echo "Enabling GitHub Pages..."
gh api repos/$GITHUB_USER/agentcorrect/pages \
    --method POST \
    --field source='{"branch":"main","path":"/docs"}' \
    2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ GitHub Pages enabled!"
    echo "🌐 Your site will be live at: https://$GITHUB_USER.github.io/agentcorrect/"
else
    echo "GitHub Pages might already be enabled or you need to do it manually:"
    echo "  1. Go to https://github.com/$GITHUB_USER/agentcorrect/settings/pages"
    echo "  2. Source: Deploy from branch"
    echo "  3. Branch: main, Folder: /docs"
fi

# Add topics to repo
echo ""
echo "Adding repository topics..."
gh api repos/$GITHUB_USER/agentcorrect/topics \
    --method PUT \
    --field names='["ai-safety","cicd","stripe","payment-processing","sql-injection","llm","ai-agents","owasp","idempotency","guardrails"]' \
    2>/dev/null

# Create initial issues
echo ""
echo "Creating starter issues..."

gh issue create \
    --repo "$GITHUB_USER/agentcorrect" \
    --title "Add support for more payment providers" \
    --body "Add detection for:
- Razorpay
- Mollie  
- Klarna
- Afterpay
- Mercado Pago

Each provider has specific idempotency requirements documented in their API docs." \
    --label "enhancement" 2>/dev/null

gh issue create \
    --repo "$GITHUB_USER/agentcorrect" \
    --title "Add GraphQL payment mutation detection" \
    --body "Detect payment mutations in GraphQL queries, not just REST APIs" \
    --label "enhancement" 2>/dev/null

# Final summary
echo ""
echo "==================================="
echo "✅ Setup Complete!"
echo "==================================="
echo ""
echo "Repository: https://github.com/$GITHUB_USER/agentcorrect"
echo "Landing Page: https://$GITHUB_USER.github.io/agentcorrect/"
echo ""
echo "Next steps:"
echo "1. Star your own repo (helps with discovery)"
echo "2. Configure agentcorrect.com DNS to point to GitHub Pages"
echo "3. Share on Twitter/LinkedIn with OWASP LLM community"
echo "4. Submit to Awesome LLM Safety lists"
echo ""
echo "To publish to PyPI:"
echo "  python -m build"
echo "  python -m twine upload dist/*"