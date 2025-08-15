# VISIBILITYAGENT Project Configuration

## Project Overview
Production V0 with focus on reliability, simplicity, and testability.

## Architecture Requirements
- **Core Principle**: Simple > Complex. Working > Perfect.
- **Max Function Length**: 50 lines
- **Max File Length**: 300 lines
- **Error Handling**: EVERY function must handle errors
- **Input Validation**: EVERY input must be validated
- **Testing**: Test-first development required

## Code Standards
```javascript
// GOOD - Simple, clear, tested
function validateUser(user) {
  if (!user?.id) throw new Error('User ID required');
  if (!user?.email) throw new Error('Email required');
  return true;
}

// BAD - Complex, unclear
function processUserDataWithMultipleValidationsAndTransformations(u) {
  // 200 lines of nested logic...
}
```

## Build Commands
```bash
build: npm run build
test: npm test
lint: npm run lint
typecheck: npm run typecheck
start: npm start
dev: npm run dev
```

## V0 Feature Requirements
<!-- REPLACE WITH YOUR ACTUAL V0 REQUIREMENTS -->
- [ ] YOUR FEATURE 1 HERE
- [ ] YOUR FEATURE 2 HERE
- [ ] YOUR FEATURE 3 HERE

## YOUR PRODUCT ARCHITECTURE
<!-- ADD YOUR ACTUAL ARCHITECTURE HERE -->
- Database: [YOUR DB]
- Backend: [YOUR BACKEND]
- Frontend: [YOUR FRONTEND]
- APIs: [YOUR APIS]

## Edge Cases to Handle
- Null/undefined inputs
- Empty arrays/objects
- Network failures
- Database connection errors
- Concurrent access
- Rate limiting

## Testing Strategy
1. Unit tests for ALL functions
2. Integration tests for API endpoints
3. Edge case coverage required
4. Error path testing mandatory

## Deployment Checklist
- [ ] All tests passing
- [ ] Lint clean
- [ ] Type checks pass
- [ ] Security scan complete
- [ ] Performance acceptable
- [ ] Documentation updated

## Agent Usage
Use agents for specialized tasks:
- `/agent orchestrator` - Coordinate complex features
- `/agent code-generator` - Generate implementation
- `/agent test-writer` - Create comprehensive tests
- `/agent security-scan` - Security validation
- `/agent code-reviewer` - Quality review

## Production Safeguards
- NO console.log in production code
- NO hardcoded credentials
- NO unhandled promises
- NO synchronous file operations
- NO unbounded loops
- NO direct database queries without parameterization

## Memory & Context
Important decisions and context stored in:
- `.claude/shared/memory/` - Persistent knowledge
- `.claude/command-history.log` - Command tracking