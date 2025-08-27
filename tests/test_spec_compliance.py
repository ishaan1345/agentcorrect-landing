#!/usr/bin/env python3
"""
Test-Driven Development: Verify AgentCorrect matches spec exactly.
Tests all vendor requirements, edge cases, and deterministic behavior.
"""

import json
import subprocess
import tempfile
from pathlib import Path
import hashlib

def run_agentcorrect(traces):
    """Run AgentCorrect and return exit code, stdout, stderr."""
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
    return result.returncode, result.stdout, result.stderr

def test(name, traces, expected_exit, must_contain=None, must_not_contain=None):
    """Run a test case with assertions."""
    print(f"\nTEST: {name}")
    print("-" * 60)
    
    exit_code, stdout, stderr = run_agentcorrect(traces)
    
    # Check exit code
    if exit_code != expected_exit:
        print(f"❌ FAIL: Exit code {exit_code}, expected {expected_exit}")
        print(f"Output: {stdout[:500]}")
        return False
    
    # Check required content
    if must_contain:
        for text in must_contain:
            if text not in stdout:
                print(f"❌ FAIL: Missing '{text}' in output")
                print(f"Output: {stdout[:500]}")
                return False
    
    # Check forbidden content
    if must_not_contain:
        for text in must_not_contain:
            if text in stdout:
                print(f"❌ FAIL: Found '{text}' (should not be present)")
                return False
    
    print(f"✅ PASS")
    return True

print("""
SPEC COMPLIANCE TEST SUITE
Testing exact requirements from vendor docs and spec
""")

passed = 0
failed = 0

# =============================================================================
# PAYMENT PROVIDER TESTS - Exact vendor requirements
# =============================================================================
print("\n" + "="*60)
print("PAYMENT PROVIDER COMPLIANCE")
print("="*60)

# Test 1: Stripe requires Idempotency-Key header
if test("Stripe - Missing Idempotency-Key header",
    [{"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://api.stripe.com/v1/charges",
        "headers": {},
        "body": {"amount": 1000}
    }}}],
    expected_exit=2,
    must_contain=["Idempotency-Key", "Stripe", "duplicate"]):
    passed += 1
else:
    failed += 1

# Test 2: Stripe with proper idempotency - should pass
if test("Stripe - WITH Idempotency-Key header",
    [{"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://api.stripe.com/v1/charges",
        "headers": {"Idempotency-Key": "unique-order-12345"},
        "body": {"amount": 1000}
    }}}],
    expected_exit=0,
    must_not_contain=["[FAIL]", "SEV0"]):
    passed += 1
else:
    failed += 1

# Test 3: Case-insensitive header matching (HTTP spec)
if test("Stripe - Case-insensitive header (idempotency-key)",
    [{"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://api.stripe.com/v1/charges",
        "headers": {"idempotency-key": "unique-order-12345"},  # lowercase
        "body": {"amount": 1000}
    }}}],
    expected_exit=0,
    must_not_contain=["[FAIL]", "SEV0"]):
    passed += 1
else:
    failed += 1

# Test 4: PayPal requires PayPal-Request-Id header
if test("PayPal - Missing PayPal-Request-Id",
    [{"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://api.paypal.com/v2/checkout/orders",
        "headers": {},
        "body": {"amount": {"value": "100.00"}}
    }}}],
    expected_exit=2,
    must_contain=["PayPal-Request-Id", "PayPal"]):
    passed += 1
else:
    failed += 1

# Test 5: Square requires idempotency_key in BODY (not header!)
if test("Square - Missing idempotency_key in body",
    [{"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://connect.squareup.com/v2/payments",
        "headers": {},
        "body": {"amount_money": {"amount": 100}}
    }}}],
    expected_exit=2,
    must_contain=["Square", "idempotency_key", "body"]):
    passed += 1
else:
    failed += 1

# Test 6: Square WITH idempotency_key in body - should pass
if test("Square - WITH idempotency_key in body",
    [{"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://connect.squareup.com/v2/payments",
        "headers": {},
        "body": {"amount_money": {"amount": 100}, "idempotency_key": "unique-123"}
    }}}],
    expected_exit=0,
    must_not_contain=["[FAIL]", "SEV0"]):
    passed += 1
else:
    failed += 1

# Test 7: Adyen requires idempotencyKey in body
if test("Adyen - Missing idempotencyKey",
    [{"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://checkout-test.adyen.com/v71/payments",
        "headers": {},
        "body": {"amount": {"value": 1000, "currency": "EUR"}}
    }}}],
    expected_exit=2,
    must_contain=["Adyen", "idempotencyKey"]):
    passed += 1
else:
    failed += 1

# Test 8: Subdomain spoofing protection
if test("Subdomain spoofing - api.stripe.com.evil.com",
    [{"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://api.stripe.com.evil.com/v1/charges",
        "headers": {},
        "body": {"amount": 1000}
    }}}],
    expected_exit=0,  # Should NOT detect as Stripe
    must_not_contain=["Stripe", "Idempotency-Key"]):
    passed += 1
else:
    failed += 1

# =============================================================================
# SQL TESTS - Parser vs Regex
# =============================================================================
print("\n" + "="*60)
print("SQL DETECTION")
print("="*60)

# Test 9: DELETE without WHERE
if test("SQL - DELETE without WHERE",
    [{"role": "sql", "meta": {"sql": {"query": "DELETE FROM users"}}}],
    expected_exit=2,
    must_contain=["DELETE", "WHERE"]):
    passed += 1
else:
    failed += 1

# Test 10: UPDATE without WHERE
if test("SQL - UPDATE without WHERE",
    [{"role": "sql", "meta": {"sql": {"query": "UPDATE users SET active=false"}}}],
    expected_exit=2,
    must_contain=["UPDATE", "WHERE"]):
    passed += 1
else:
    failed += 1

# Test 11: Tautology WHERE 1=1
if test("SQL - Tautology WHERE 1=1",
    [{"role": "sql", "meta": {"sql": {"query": "DELETE FROM users WHERE 1=1"}}}],
    expected_exit=2,
    must_contain=["1=1"]):
    passed += 1
else:
    failed += 1

# Test 12: Valid DELETE with WHERE
if test("SQL - Valid DELETE with WHERE",
    [{"role": "sql", "meta": {"sql": {"query": "DELETE FROM users WHERE id=123"}}}],
    expected_exit=0,
    must_not_contain=["[FAIL]"]):
    passed += 1
else:
    failed += 1

# Test 13: TRUNCATE TABLE
if test("SQL - TRUNCATE TABLE",
    [{"role": "sql", "meta": {"sql": {"query": "TRUNCATE TABLE orders"}}}],
    expected_exit=2,
    must_contain=["TRUNCATE"]):
    passed += 1
else:
    failed += 1

# Test 14: DROP TABLE
if test("SQL - DROP TABLE",
    [{"role": "sql", "meta": {"sql": {"query": "DROP TABLE customers"}}}],
    expected_exit=2,
    must_contain=["DROP"]):
    passed += 1
else:
    failed += 1

# =============================================================================
# INFRASTRUCTURE TESTS
# =============================================================================
print("\n" + "="*60)
print("INFRASTRUCTURE")
print("="*60)

# Test 15: Redis FLUSHALL
if test("Redis - FLUSHALL",
    [{"role": "redis", "meta": {"redis": {"command": "FLUSHALL"}}}],
    expected_exit=2,
    must_contain=["FLUSHALL", "Redis"]):
    passed += 1
else:
    failed += 1

# Test 16: Redis FLUSHDB
if test("Redis - FLUSHDB",
    [{"role": "redis", "meta": {"redis": {"command": "FLUSHDB"}}}],
    expected_exit=2,
    must_contain=["FLUSH"]):
    passed += 1
else:
    failed += 1

# Test 17: Redis GET (safe operation)
if test("Redis - GET (safe)",
    [{"role": "redis", "meta": {"redis": {"command": "GET user:123"}}}],
    expected_exit=0,
    must_not_contain=["[FAIL]"]):
    passed += 1
else:
    failed += 1

# =============================================================================
# DETERMINISTIC OUTPUT TESTS
# =============================================================================
print("\n" + "="*60)
print("DETERMINISTIC BEHAVIOR")
print("="*60)

# Test 18: No timestamps in output
traces = [{"role": "http", "meta": {"http": {
    "method": "POST",
    "url": "https://api.stripe.com/v1/charges",
    "headers": {},
    "body": {"amount": 1000}
}}}]

exit1, out1, _ = run_agentcorrect(traces)
exit2, out2, _ = run_agentcorrect(traces)

# Remove coverage percentage which might vary
out1_clean = '\n'.join([line for line in out1.split('\n') if 'Coverage:' not in line])
out2_clean = '\n'.join([line for line in out2.split('\n') if 'Coverage:' not in line])

if out1_clean == out2_clean and exit1 == exit2:
    print("✅ PASS: Deterministic output (no timestamps)")
    passed += 1
else:
    print("❌ FAIL: Output not deterministic")
    print(f"Hash1: {hashlib.md5(out1_clean.encode()).hexdigest()}")
    print(f"Hash2: {hashlib.md5(out2_clean.encode()).hexdigest()}")
    failed += 1

# =============================================================================
# COVERAGE GAP REPORTING
# =============================================================================
print("\n" + "="*60)
print("COVERAGE REPORTING")
print("="*60)

# Test 19: Coverage gaps reported
exit_code, stdout, stderr = run_agentcorrect([
    {"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://unknown-payment.com/charge",
        "headers": {},
        "body": {"amount": 1000}
    }}}
])

if "Coverage:" in stdout or "unknown" in stdout.lower():
    print("✅ PASS: Coverage gaps reported")
    passed += 1
else:
    print("❌ FAIL: Coverage gaps not reported")
    failed += 1

# =============================================================================
# EDGE CASES
# =============================================================================
print("\n" + "="*60)
print("EDGE CASES")
print("="*60)

# Test 20: Empty trace file
if test("Empty trace file",
    [],
    expected_exit=0):
    passed += 1
else:
    failed += 1

# Test 21: GET request to payment provider (should not require idempotency)
if test("Stripe GET request (read-only)",
    [{"role": "http", "meta": {"http": {
        "method": "GET",
        "url": "https://api.stripe.com/v1/charges/ch_123",
        "headers": {}
    }}}],
    expected_exit=0,
    must_not_contain=["[FAIL]", "idempotency"]):
    passed += 1
else:
    failed += 1

# Test 22: Multiple issues in one trace
traces = [
    {"role": "http", "meta": {"http": {
        "method": "POST",
        "url": "https://api.stripe.com/v1/charges",
        "headers": {},
        "body": {"amount": 1000}
    }}},
    {"role": "sql", "meta": {"sql": {"query": "DELETE FROM users"}}},
    {"role": "redis", "meta": {"redis": {"command": "FLUSHALL"}}}
]

exit_code, stdout, _ = run_agentcorrect(traces)
if exit_code == 2 and "[FAIL]" in stdout and stdout.count("[FAIL]") >= 3:
    print("✅ PASS: Multiple issues detected")
    passed += 1
else:
    print("❌ FAIL: Not all issues detected")
    failed += 1

# =============================================================================
# SUMMARY
# =============================================================================
print("\n" + "="*60)
print(f"RESULTS: {passed}/{passed+failed} tests passed")
print("="*60)

if failed == 0:
    print("\n✅ SPEC COMPLIANCE: 100% - Ready to ship!")
    print("\nVerified:")
    print("- Exact vendor requirements (Stripe, PayPal, Square, Adyen)")
    print("- Case-insensitive headers")
    print("- Body vs header idempotency")
    print("- SQL detection without false positives")
    print("- Deterministic output")
    print("- Coverage gap reporting")
else:
    print(f"\n❌ SPEC COMPLIANCE: {(passed/(passed+failed)*100):.1f}% - Needs fixes")
    exit(1)