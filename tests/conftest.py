"""Pytest configuration and fixtures."""

import json
import tempfile
from pathlib import Path
from typing import List, Dict, Any

import pytest


@pytest.fixture
def temp_jsonl_file():
    """Create a temporary JSONL file for testing."""
    def _create_file(traces: List[Dict[str, Any]]):
        with tempfile.NamedTemporaryFile(mode='w', suffix='.jsonl', delete=False) as f:
            for trace in traces:
                f.write(json.dumps(trace) + '\n')
            return Path(f.name)
    
    files = []
    yield lambda traces: _create_file(traces)
    
    # Cleanup
    for file in files:
        if file.exists():
            file.unlink()


@pytest.fixture
def sample_traces():
    """Provide sample trace data for testing."""
    return {
        "stripe_missing_idempotency": [{
            "role": "http",
            "meta": {"http": {
                "method": "POST",
                "url": "https://api.stripe.com/v1/charges",
                "headers": {},
                "body": {"amount": 1000}
            }}
        }],
        "clean_sql": [{
            "role": "sql",
            "meta": {"sql": {"query": "SELECT * FROM users WHERE id=123"}}
        }],
        "dangerous_sql": [{
            "role": "sql", 
            "meta": {"sql": {"query": "DELETE FROM users"}}
        }],
        "redis_flushall": [{
            "role": "redis",
            "meta": {"redis": {"command": "FLUSHALL"}}
        }]
    }