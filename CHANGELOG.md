# Changelog

All notable changes to AgentCorrect will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-15

### Added
- Initial stable release
- Payment provider detection for 20+ providers (Stripe, PayPal, Square, Adyen, etc.)
- SQL disaster prevention (DELETE/UPDATE without WHERE, tautologies, DROP/TRUNCATE)
- Infrastructure protection (Redis FLUSHALL, MongoDB dropDatabase, S3 DeleteBucket)
- Comprehensive test suite with pytest
- GitHub Actions CI/CD pipeline
- Professional project structure and documentation

### Security
- Prevents duplicate payment charges via idempotency key validation
- Blocks dangerous database operations before production
- Protects critical infrastructure from accidental destruction

## [0.9.0-beta] - 2024-01-01

### Added
- Beta release with core functionality
- Basic payment provider detection
- SQL pattern matching
- CLI interface

### Changed
- Improved error messages with actionable fixes
- Enhanced documentation with real-world examples

### Fixed
- Edge cases in SQL tautology detection
- False positives in payment endpoint detection

## [0.1.0-alpha] - 2023-12-15

### Added
- Initial proof of concept
- Basic Stripe idempotency detection
- Simple SQL WHERE clause checking