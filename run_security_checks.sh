#!/bin/bash

# Security audit script for AgentCorrect
# Run before each release or as part of CI/CD pipeline

echo "==================================="
echo "Running Security Checks"
echo "==================================="

# Check for Python availability
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

# Install security tools if not present
echo "Installing security tools..."
pip3 install -q bandit safety pip-audit 2>/dev/null || true

echo ""
echo "1. Scanning for hardcoded secrets..."
echo "-----------------------------------"
# Check for potential secrets
grep -r -i -E "(api[_-]?key|password|secret|token|auth)" . \
    --exclude-dir=.git \
    --exclude-dir=__pycache__ \
    --exclude-dir=.pytest_cache \
    --exclude-dir=dist \
    --exclude-dir=build \
    --exclude="*.pyc" \
    --exclude="run_security_checks.sh" \
    --exclude="SECURITY.md" \
    | grep -v -E "(xxx|PLACEHOLDER|example|test_|demo_)" \
    | head -20

if [ $? -eq 0 ]; then
    echo "⚠️  Warning: Potential secrets found. Review the above matches."
else
    echo "✅ No hardcoded secrets detected"
fi

echo ""
echo "2. Running Bandit security linter..."
echo "-----------------------------------"
if command -v bandit &> /dev/null; then
    bandit -r agentcorrect/ -f txt -ll 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ Bandit: No high-severity issues found"
    else
        echo "⚠️  Bandit found issues. Review above."
    fi
else
    echo "⚠️  Bandit not installed. Run: pip install bandit"
fi

echo ""
echo "3. Checking dependencies for vulnerabilities..."
echo "-----------------------------------"
if command -v safety &> /dev/null; then
    safety check --json 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ Safety: No known vulnerabilities in dependencies"
    else
        echo "⚠️  Safety found vulnerable dependencies"
    fi
else
    echo "⚠️  Safety not installed. Run: pip install safety"
fi

echo ""
echo "4. Auditing Python packages..."
echo "-----------------------------------"
if command -v pip-audit &> /dev/null; then
    pip-audit --desc 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ pip-audit: No vulnerabilities found"
    else
        echo "⚠️  pip-audit found issues"
    fi
else
    echo "⚠️  pip-audit not installed. Run: pip install pip-audit"
fi

echo ""
echo "5. Checking file permissions..."
echo "-----------------------------------"
# Check for world-writable files
WORLD_WRITABLE=$(find . -type f -perm -002 2>/dev/null | grep -v ".git" | head -10)
if [ -n "$WORLD_WRITABLE" ]; then
    echo "⚠️  Warning: World-writable files found:"
    echo "$WORLD_WRITABLE"
    echo "Run ./fix_permissions.sh to fix"
else
    echo "✅ No world-writable files found"
fi

echo ""
echo "6. Checking for SQL injection patterns..."
echo "-----------------------------------"
# Look for string concatenation in SQL queries
grep -r -E "(\+|%).*['\"].*\b(SELECT|INSERT|UPDATE|DELETE|DROP|TRUNCATE)\b" agentcorrect/ 2>/dev/null | head -5
if [ $? -eq 0 ]; then
    echo "⚠️  Warning: Potential SQL injection patterns found"
else
    echo "✅ No obvious SQL injection patterns detected"
fi

echo ""
echo "7. Checking for command injection risks..."
echo "-----------------------------------"
# Check for dangerous functions
grep -r -E "(subprocess.*shell=True|os\.system|eval|exec|compile|__import__)" agentcorrect/ 2>/dev/null | head -5
if [ $? -eq 0 ]; then
    echo "⚠️  Warning: Potentially dangerous functions found"
else
    echo "✅ No dangerous function calls detected"
fi

echo ""
echo "==================================="
echo "Security Check Summary"
echo "==================================="
echo ""
echo "Next steps for production deployment:"
echo "1. Review any warnings above"
echo "2. Run ./fix_permissions.sh to set secure file permissions"
echo "3. Set up proper secret management"
echo "4. Enable audit logging"
echo "5. Configure monitoring and alerting"
echo "6. Review SECURITY.md for complete checklist"
echo ""
echo "For CI/CD integration, add this script to your pipeline."