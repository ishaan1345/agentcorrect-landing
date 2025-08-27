.PHONY: help install install-dev test test-cov lint format type-check security clean build upload docs

help:
	@echo "Available commands:"
	@echo "  install      Install the package in production mode"
	@echo "  install-dev  Install the package with dev dependencies"
	@echo "  test         Run tests with pytest"
	@echo "  test-cov     Run tests with coverage report"
	@echo "  lint         Run linting with ruff"
	@echo "  format       Format code with black and isort"
	@echo "  type-check   Run type checking with mypy"
	@echo "  security     Run security checks"
	@echo "  clean        Remove build artifacts"
	@echo "  build        Build distribution packages"
	@echo "  docs         Build documentation"

install:
	pip install -e .

install-dev:
	pip install -e .
	pip install -r requirements-dev.txt

test:
	pytest tests -v

test-cov:
	pytest tests -v --cov=agentcorrect --cov-report=term --cov-report=html

lint:
	ruff check agentcorrect tests

format:
	black agentcorrect tests
	isort agentcorrect tests

type-check:
	mypy agentcorrect tests --ignore-missing-imports

security:
	bandit -r agentcorrect
	safety check

clean:
	rm -rf build dist *.egg-info
	rm -rf .pytest_cache .coverage htmlcov
	rm -rf .mypy_cache .ruff_cache
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete

build: clean
	python -m build

docs:
	cd docs && sphinx-build -b html . _build/html