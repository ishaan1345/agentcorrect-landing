# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in AgentCorrect, please report it to us responsibly:

1. **DO NOT** create a public GitHub issue for the vulnerability
2. Email your findings to: security@agentcorrect.io (update with actual email)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested remediation if available

We will acknowledge receipt within 48 hours and provide updates on remediation progress.

## Security Measures

### Input Validation
- All JSONL input is validated before processing
- File paths are checked for existence and proper format
- Regex patterns are compiled with error handling to prevent ReDoS attacks
- JSON parsing includes error handling for malformed data

### Data Protection
- API keys and tokens in demo/test files use placeholder values (xxx)
- PII detection and redaction capabilities built-in
- No storage of sensitive data by default (--no-store flag)
- Data retention configurable with automatic cleanup

### Code Security
- No use of dangerous functions (eval, exec, shell=True)
- No SQL query construction from user input
- File operations restricted to specified paths
- All external input sanitized before use

### Dependencies
- Minimal dependencies (zero runtime dependencies)
- Regular security audits of any future dependencies
- Python 3.8+ requirement for security patches

### File Permissions
- Installation does not require elevated privileges
- No modification of system files
- User-space only operation

## Security Best Practices for Users

### 1. API Key Management
- Never commit real API keys to version control
- Use environment variables for production keys
- Rotate keys regularly
- Use test keys for development

### 2. File Permissions
- Restrict access to trace files containing sensitive data
- Use appropriate file permissions (600 or 640) for config files
- Don't run with elevated privileges unless necessary

### 3. Network Security
- Run in isolated environments when processing production data
- Use TLS/HTTPS for all API communications
- Implement network segmentation for sensitive operations

### 4. Audit Logging
- Enable audit logging for all production use
- Monitor for unusual patterns or repeated failures
- Retain logs according to compliance requirements

### 5. Integration Security
- Validate all webhook payloads
- Use authentication for API endpoints
- Implement rate limiting
- Monitor for anomalous activity

## Compliance

AgentCorrect helps enforce compliance with:
- PCI DSS (Payment Card Industry Data Security Standard)
- GDPR (General Data Protection Regulation)
- CCPA (California Consumer Privacy Act)
- SOC 2 Type II requirements

## Security Headers (for Web Deployments)

If deploying as a web service, implement these headers:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Known Security Considerations

1. **Demo Files**: Contains example API keys (all are dummy values like "xxx" or "sk_test_xxx")
2. **File Permissions**: Current WSL environment shows 777 permissions - should be restricted in production
3. **No Authentication**: Tool runs locally without authentication - secure deployment environment if exposed

## Security Checklist for Production

- [ ] Replace all placeholder API keys with secure key management
- [ ] Implement proper file permissions (remove 777 permissions)
- [ ] Enable audit logging
- [ ] Configure data retention policies
- [ ] Set up monitoring and alerting
- [ ] Implement access controls if deployed as service
- [ ] Regular security updates for Python and dependencies
- [ ] Vulnerability scanning in CI/CD pipeline
- [ ] Security training for development team
- [ ] Incident response plan in place

## Contact

Security Team: security@agentcorrect.io (update with actual contact)
Bug Bounty Program: Coming soon

Last Updated: 2025-08-25