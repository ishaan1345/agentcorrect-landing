#!/usr/bin/env python3
"""
Demo: AgentCorrect as a painkiller for AI agent teams.
Shows real scenarios that cause production disasters.

SECURITY NOTE: All API keys in this demo are placeholders (xxx, sk_test_xxx, sk_live_xxx).
Never use real API keys in demo or test files.
"""

import json
import os
import subprocess
import tempfile
from pathlib import Path

# Security: Use environment variable or safe placeholder for demos
DEMO_API_KEY = os.getenv('DEMO_API_KEY', 'sk_test_xxx_PLACEHOLDER')

def demo_scenario(name, description, traces):
    """Run a demo scenario."""
    print(f"\n{'=' * 60}")
    print(f"SCENARIO: {name}")
    print(f"{description}")
    print('=' * 60)
    
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
    
    print(result.stdout)
    print(f"\nExit code: {result.returncode}")
    
    if result.returncode == 2:
        print("✅ CI/CD would block this - disaster prevented!")
    elif result.returncode == 0:
        print("✅ Clean - safe to deploy")
    
    return result.returncode

print("""
AGENTCORRECT: THE PAINKILLER FOR AI AGENT TEAMS
================================================

Problem: AI agents retry failed operations and cause disasters
Solution: Block deployments when dangerous patterns detected
""")

# Scenario 1: The duplicate charge disaster
demo_scenario(
    "AI Agent Retries Payment After Timeout",
    "Agent doesn't get response from Stripe, retries the charge.\nWithout idempotency, customer gets charged twice!",
    [
        {"role": "http", "meta": {"http": {
            "method": "POST",
            "url": "https://api.stripe.com/v1/charges",
            "headers": {"Authorization": "Bearer sk_live_xxx"},
            "body": {"amount": 9999, "currency": "usd", "customer": "cus_123"}
        }}},
        # Agent retries after timeout
        {"role": "http", "meta": {"http": {
            "method": "POST",
            "url": "https://api.stripe.com/v1/charges",
            "headers": {"Authorization": "Bearer sk_live_xxx"},
            "body": {"amount": 9999, "currency": "usd", "customer": "cus_123"}
        }}}
    ]
)

# Scenario 2: The database wipe
demo_scenario(
    "AI Agent Cleans Up Old Records",
    "Agent tries to delete inactive users but forgets WHERE clause.\nWould delete ALL users in production!",
    [
        {"role": "sql", "meta": {"sql": {
            "query": "DELETE FROM users",
            "intent": "Remove inactive users"
        }}}
    ]
)

# Scenario 3: The cache flush
demo_scenario(
    "AI Agent Tries to Clear Test Data",
    "Agent runs Redis FLUSHALL thinking it's in dev.\nWould wipe entire production cache!",
    [
        {"role": "redis", "meta": {"redis": {
            "command": "FLUSHALL",
            "intent": "Clear test data"
        }}}
    ]
)

# Scenario 4: Clean, safe operations
demo_scenario(
    "Properly Implemented Agent",
    "This agent does everything right - idempotency keys and proper WHERE clauses.",
    [
        {"role": "http", "meta": {"http": {
            "method": "POST",
            "url": "https://api.stripe.com/v1/charges",
            "headers": {
                "Authorization": "Bearer sk_live_xxx",
                "Idempotency-Key": "order-12345-retry-safe"
            },
            "body": {"amount": 9999, "currency": "usd"}
        }}},
        {"role": "sql", "meta": {"sql": {
            "query": "DELETE FROM users WHERE last_login < '2024-01-01' AND status = 'inactive'"
        }}},
        {"role": "redis", "meta": {"redis": {
            "command": "DEL session:expired:12345"
        }}}
    ]
)

print(f"""
{'=' * 60}
WHY THIS IS A PAINKILLER
{'=' * 60}

For Teams With Payment APIs:
- Prevents duplicate charges (angry customers, chargebacks)
- Each retry without idempotency = double charge
- Stripe alone processes $1T/year - these mistakes are expensive

For Teams With Databases:
- Catches DELETE/UPDATE without WHERE before production
- One missing WHERE clause = entire table gone
- No rollback for TRUNCATE/DROP operations

For DevOps:
- Implements OWASP guidance on AI "Excessive Agency"
- Same CI/CD pattern as existing tools (exit codes)
- Vendor-anchored rules from official docs

WHO NEEDS THIS TODAY:
✓ Any team with AI agents calling Stripe/PayPal/Square
✓ Companies using AI for database maintenance
✓ Anyone who's had an agent cause a production incident
✓ Teams shipping agents to production without manual review

The pain is real. The solution is simple. That's a painkiller.
""")