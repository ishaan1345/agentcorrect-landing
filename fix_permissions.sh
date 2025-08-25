#!/bin/bash

# Security script to fix file permissions for production deployment
# Run this script before deploying to production

echo "Fixing file permissions for security..."

# Set proper permissions for Python files (readable/executable by owner, readable by group)
find . -type f -name "*.py" -exec chmod 644 {} \;

# Set proper permissions for shell scripts
find . -type f -name "*.sh" -exec chmod 755 {} \;
find . -type f -name "*.bat" -exec chmod 755 {} \;
find . -type f -name "*.ps1" -exec chmod 755 {} \;

# Set proper permissions for directories
find . -type d -exec chmod 755 {} \;

# Restrict access to sensitive files
[ -f .env ] && chmod 600 .env
[ -f .env.production ] && chmod 600 .env.production
[ -f config/production.yml ] && chmod 600 config/production.yml
[ -f config/production.json ] && chmod 600 config/production.json

# Restrict access to git directory
[ -d .git ] && chmod -R 700 .git

# Restrict access to any key files
find . -type f \( -name "*.key" -o -name "*.pem" -o -name "*_rsa" -o -name "*_dsa" \) -exec chmod 600 {} \;

echo "Permissions fixed. Security hardening complete."
echo ""
echo "Additional manual steps for production:"
echo "1. Review and update SECURITY.md contact information"
echo "2. Set up proper key management (e.g., AWS Secrets Manager, HashiCorp Vault)"
echo "3. Enable audit logging"
echo "4. Configure monitoring and alerting"
echo "5. Run security scanner (e.g., bandit, safety)"