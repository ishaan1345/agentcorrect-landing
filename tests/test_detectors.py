"""Test suite for AgentCorrect detectors."""

import json
import subprocess
import tempfile
from pathlib import Path

import pytest


class TestPaymentProviders:
    """Test payment provider detection."""
    
    @pytest.mark.parametrize("provider,url,key_field,location", [
        ("Stripe", "https://api.stripe.com/v1/charges", "Idempotency-Key", "header"),
        ("PayPal", "https://api.paypal.com/v2/checkout/orders", "PayPal-Request-Id", "header"),
        ("Square", "https://connect.squareup.com/v2/payments", "idempotency_key", "body"),
        ("Adyen", "https://checkout-test.adyen.com/v71/payments", "idempotencyKey", "body"),
    ])
    def test_missing_idempotency_key(self, provider, url, key_field, location):
        """Test detection of missing idempotency keys for payment providers."""
        trace = [{
            "role": "http",
            "meta": {"http": {
                "method": "POST",
                "url": url,
                "headers": {},
                "body": {"amount": 1000}
            }}
        }]
        
        with tempfile.NamedTemporaryFile(mode='w', suffix='.jsonl', delete=False) as f:
            f.write(json.dumps(trace[0]) + '\n')
            temp_file = f.name
        
        result = subprocess.run(
            ['python3', '-m', 'agentcorrect', 'analyze', temp_file],
            capture_output=True,
            text=True
        )
        
        Path(temp_file).unlink()
        
        assert result.returncode == 2, f"{provider} should fail without idempotency key"
        assert provider in result.stdout, f"Output should mention {provider}"
    
    def test_stripe_with_idempotency_key(self):
        """Test Stripe with proper idempotency key."""
        trace = [{
            "role": "http",
            "meta": {"http": {
                "method": "POST",
                "url": "https://api.stripe.com/v1/charges",
                "headers": {"Idempotency-Key": "order-12345"},
                "body": {"amount": 1000}
            }}
        }]
        
        with tempfile.NamedTemporaryFile(mode='w', suffix='.jsonl', delete=False) as f:
            f.write(json.dumps(trace[0]) + '\n')
            temp_file = f.name
        
        result = subprocess.run(
            ['python3', '-m', 'agentcorrect', 'analyze', temp_file],
            capture_output=True,
            text=True
        )
        
        Path(temp_file).unlink()
        
        assert result.returncode == 0, "Should pass with idempotency key"


class TestSQLPatterns:
    """Test SQL pattern detection."""
    
    @pytest.mark.parametrize("query,expected_exit,description", [
        ("DELETE FROM users", 2, "DELETE without WHERE"),
        ("UPDATE users SET active=false", 2, "UPDATE without WHERE"),
        ("DELETE FROM users WHERE 1=1", 2, "DELETE with tautology"),
        ("TRUNCATE TABLE orders", 2, "TRUNCATE TABLE"),
        ("DROP TABLE users", 2, "DROP TABLE"),
        ("DELETE FROM users WHERE id=123", 0, "Valid DELETE"),
        ("UPDATE users SET active=true WHERE id=456", 0, "Valid UPDATE"),
        ("SELECT * FROM users", 0, "SELECT query"),
    ])
    def test_sql_patterns(self, query, expected_exit, description):
        """Test SQL disaster pattern detection."""
        trace = [{"role": "sql", "meta": {"sql": {"query": query}}}]
        
        with tempfile.NamedTemporaryFile(mode='w', suffix='.jsonl', delete=False) as f:
            f.write(json.dumps(trace[0]) + '\n')
            temp_file = f.name
        
        result = subprocess.run(
            ['python3', '-m', 'agentcorrect', 'analyze', temp_file],
            capture_output=True,
            text=True
        )
        
        Path(temp_file).unlink()
        
        assert result.returncode == expected_exit, f"{description}: expected exit {expected_exit}, got {result.returncode}"


class TestInfrastructureProtection:
    """Test infrastructure protection."""
    
    @pytest.mark.parametrize("event,expected_exit,description", [
        ({"role": "redis", "meta": {"redis": {"command": "FLUSHALL"}}}, 2, "Redis FLUSHALL"),
        ({"role": "redis", "meta": {"redis": {"command": "FLUSHDB"}}}, 2, "Redis FLUSHDB"),
        ({"role": "redis", "meta": {"redis": {"command": "GET user:123"}}}, 0, "Redis GET"),
        ({"role": "mongo", "meta": {"mongo": {"op": "dropDatabase"}}}, 2, "MongoDB drop"),
        ({"role": "s3", "meta": {"s3": {"op": "DeleteBucket", "bucket": "prod"}}}, 2, "S3 DeleteBucket"),
    ])
    def test_infrastructure_operations(self, event, expected_exit, description):
        """Test infrastructure disaster detection."""
        with tempfile.NamedTemporaryFile(mode='w', suffix='.jsonl', delete=False) as f:
            f.write(json.dumps(event) + '\n')
            temp_file = f.name
        
        result = subprocess.run(
            ['python3', '-m', 'agentcorrect', 'analyze', temp_file],
            capture_output=True,
            text=True
        )
        
        Path(temp_file).unlink()
        
        assert result.returncode == expected_exit, f"{description}: expected exit {expected_exit}, got {result.returncode}"


class TestCompleteScenarios:
    """Test complete multi-event scenarios."""
    
    def test_clean_trace(self):
        """Test a completely clean trace with multiple events."""
        trace = [
            {
                "role": "http",
                "meta": {"http": {
                    "method": "POST",
                    "url": "https://api.stripe.com/v1/charges",
                    "headers": {"Idempotency-Key": "order-12345"},
                    "body": {"amount": 1000}
                }}
            },
            {
                "role": "sql",
                "meta": {"sql": {"query": "SELECT * FROM users WHERE id=123"}}
            },
            {
                "role": "redis",
                "meta": {"redis": {"command": "GET session:abc"}}
            }
        ]
        
        with tempfile.NamedTemporaryFile(mode='w', suffix='.jsonl', delete=False) as f:
            for event in trace:
                f.write(json.dumps(event) + '\n')
            temp_file = f.name
        
        result = subprocess.run(
            ['python3', '-m', 'agentcorrect', 'analyze', temp_file],
            capture_output=True,
            text=True
        )
        
        Path(temp_file).unlink()
        
        assert result.returncode == 0, "Clean trace should pass"
    
    def test_mixed_disasters(self):
        """Test trace with multiple disasters."""
        trace = [
            {
                "role": "http",
                "meta": {"http": {
                    "method": "POST",
                    "url": "https://api.stripe.com/v1/charges",
                    "headers": {},  # Missing idempotency
                    "body": {"amount": 1000}
                }}
            },
            {
                "role": "sql",
                "meta": {"sql": {"query": "DELETE FROM users"}}  # Missing WHERE
            }
        ]
        
        with tempfile.NamedTemporaryFile(mode='w', suffix='.jsonl', delete=False) as f:
            for event in trace:
                f.write(json.dumps(event) + '\n')
            temp_file = f.name
        
        result = subprocess.run(
            ['python3', '-m', 'agentcorrect', 'analyze', temp_file],
            capture_output=True,
            text=True
        )
        
        Path(temp_file).unlink()
        
        assert result.returncode == 2, "Should fail with multiple disasters"
        assert "Stripe" in result.stdout, "Should mention Stripe issue"
        assert "DELETE" in result.stdout or "SQL" in result.stdout, "Should mention SQL issue"