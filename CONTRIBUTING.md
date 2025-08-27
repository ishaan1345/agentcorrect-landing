# Contributing to AgentCorrect

Thank you for your interest in contributing to AgentCorrect! We welcome contributions from the community.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agentcorrect.git
   cd agentcorrect
   ```

3. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. Install in development mode:
   ```bash
   make install-dev
   # or manually:
   pip install -e .
   pip install -r requirements-dev.txt
   ```

## Development Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and ensure tests pass:
   ```bash
   make test
   make lint
   make type-check
   ```

3. Format your code:
   ```bash
   make format
   ```

4. Commit with a descriptive message:
   ```bash
   git commit -m "feat: add new detector for X provider"
   ```

5. Push and create a pull request

## Testing

Run the test suite:
```bash
make test         # Run all tests
make test-cov     # Run with coverage report
pytest tests/test_detectors.py  # Run specific test file
```

## Code Style

We use:
- **Black** for code formatting (line length: 100)
- **isort** for import sorting
- **ruff** for linting
- **mypy** for type checking

Run all checks:
```bash
make lint format type-check
```

## Adding New Detectors

1. Add detector logic to `agentcorrect/detectors_ultimate.py`
2. Add test cases to `tests/test_detectors.py`
3. Update documentation in README.md
4. Add example traces to `agentcorrect/fixtures/`

## Pull Request Guidelines

- Write clear, descriptive commit messages
- Include tests for new functionality
- Update documentation as needed
- Ensure all CI checks pass
- Keep PRs focused on a single feature/fix

## Reporting Issues

Please use GitHub Issues to report bugs or request features. Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Python version and OS
- Minimal code example if applicable

## Security Issues

For security vulnerabilities, please email security@agentcorrect.com directly instead of creating a public issue.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.