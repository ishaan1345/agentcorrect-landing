#!/usr/bin/env python3
"""
Complete test of AgentCorrect functionality.
Tests all payment providers, SQL patterns, and infrastructure operations.
"""

import json
import subprocess
import tempfile
from pathlib import Path

def run_test(name, traces, expected_exit):
    """Run a test case."""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.jsonl', delete=False) as f:
        for trace in traces:
            f.write(json.dumps(trace) + '\n')
        temp_file = f.name
    
    result = subprocess.run(
        ['python3', '-m', 'agentcorrect', 'analyze', temp_file],
        capture_output=True,
        text=True
    )
    
    Path(temp_file).unlink()
    
    success = result.returncode == expected_exit
    status = "PASS" if success else f"FAIL (got {result.returncode}, expected {expected_exit})"
    
    print(f"{name}: {status}")
    if not success or True:  # Always show output for verification
        print(result.stdout[:500])
        print()
    
    return success

print("AGENTCORRECT COMPLETE TEST SUITE")
print("=" * 60)

passed = 0
failed = 0

# Test 1: Payment providers
print("\n1. PAYMENT PROVIDER DETECTION")
print("-" * 40)

providers = [
    ("Stripe", "https://api.stripe.com/v1/charges", "Idempotency-Key", "header"),
    ("PayPal", "https://api.paypal.com/v2/checkout/orders", "PayPal-Request-Id", "header"),
    ("Square", "https://connect.squareup.com/v2/payments", "idempotency_key", "body"),
    ("Adyen", "https://checkout-test.adyen.com/v71/payments", "idempotencyKey", "body"),
]

for provider, url, field, location in providers:
    trace = [{"role": "http", "meta": {"http": {
        "method": "POST",
        "url": url,
        "headers": {},
        "body": {"amount": 1000}
    }}}]
    
    if run_test(f"{provider} missing idempotency", trace, 2):
        passed += 1
    else:
        failed += 1

# Test 2: SQL patterns
print("\n2. SQL DISASTER DETECTION")
print("-" * 40)

sql_tests = [
    ("DELETE without WHERE", "DELETE FROM users", 2),
    ("UPDATE without WHERE", "UPDATE users SET active=false", 2),
    ("DELETE with tautology", "DELETE FROM users WHERE 1=1", 2),
    ("TRUNCATE TABLE", "TRUNCATE TABLE orders", 2),
    ("DROP TABLE", "DROP TABLE users", 2),
    ("Valid DELETE", "DELETE FROM users WHERE id=123", 0),
    ("Valid UPDATE", "UPDATE users SET active=true WHERE id=456", 0),
]

for name, query, expected in sql_tests:
    trace = [{"role": "sql", "meta": {"sql": {"query": query}}}]
    
    if run_test(name, trace, expected):
        passed += 1
    else:
        failed += 1

# Test 3: Infrastructure
print("\n3. INFRASTRUCTURE PROTECTION")
print("-" * 40)

infra_tests = [
    ("Redis FLUSHALL", {"role": "redis", "meta": {"redis": {"command": "FLUSHALL"}}}, 2),
    ("Redis FLUSHDB", {"role": "redis", "meta": {"redis": {"command": "FLUSHDB"}}}, 2),
    ("Redis GET (safe)", {"role": "redis", "meta": {"redis": {"command": "GET user:123"}}}, 0),
    ("MongoDB drop", {"role": "mongo", "meta": {"mongo": {"op": "dropDatabase"}}}, 2),
    ("S3 DeleteBucket", {"role": "s3", "meta": {"s3": {"op": "DeleteBucket", "bucket": "prod-data"}}}, 2),
]

for name, event, expected in infra_tests:
    if run_test(name, [event], expected):
        passed += 1
    else:
        failed += 1

# Test 4: Clean trace
print("\n4. CLEAN TRACE TEST")
print("-" * 40)

clean_trace = [
    {"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://api.stripe.com/v1/charges",
        "headers": {"Idempotency-Key": "order-12345-unique"},
        "body": {"amount": 1000}
    }}},
    {"role": "sql", "meta": {"sql": {"query": "SELECT * FROM users WHERE id=123"}}},
    {"role": "redis", "meta": {"redis": {"command": "GET session:abc"}}},
]

if run_test("Clean trace should pass", clean_trace, 0):
    passed += 1
else:
    failed += 1

# Summary
print("=" * 60)
print(f"RESULTS: {passed}/{passed+failed} tests passed")

if failed == 0:
    print("\n✅ ALL TESTS PASSED - AgentCorrect is working correctly!")
else:
    print(f"\n❌ {failed} tests failed - needs fixing")
    exit(1)