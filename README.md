# AgentCorrect

Stop AI agents from breaking production. Deterministic CI/CD guardrails that prevent duplicate charges and data destruction.

## The Problem

AI agents have "Excessive Agency" - they can execute actions beyond intended scope ([OWASP 2025](https://owasp.org/www-project-llm-ai-security/)). Real incidents:
- Duplicate payment charges when agents retry
- Production databases wiped by overeager cleanup
- Cache flushes causing service outages

## What AgentCorrect Does

Analyzes agent execution traces in CI/CD and **fails the build** (exit code 2) when it detects:

### Payment Disasters
- **Missing idempotency keys** for Stripe, PayPal, Square, Adyen, and 20+ providers
- Each provider's exact requirements from their docs
- Prevents duplicate charges when agents retry

### SQL Disasters  
- `DELETE FROM users` → No WHERE clause
- `UPDATE ... WHERE 1=1` → Tautology that affects all rows
- `DROP TABLE`, `TRUNCATE` → Irreversible destruction

### Infrastructure Disasters
- Redis `FLUSHALL` → Wipes entire cache
- MongoDB `dropDatabase` → Deletes all collections
- S3 `DeleteBucket` → Removes all objects

## Quick Start

```bash
pip install agentcorrect
agentcorrect analyze trace.jsonl
# Exit 0 = Clean, Exit 2 = Disasters found (blocks CI/CD)
```

## Real Example Output

```
[FAIL] Missing payment idempotency
   Endpoint: https://api.stripe.com/v1/charges
   Provider: Stripe
   Why: Stripe requires idempotency to prevent duplicate charges
   Fix: Add header 'Idempotency-Key: <unique-order-id>'
   Docs: See stripe.com/docs/idempotency

[FAIL] Dangerous SQL operation
   Query: DELETE FROM users WHERE active=false
   Why: Missing WHERE clause constraints
   Fix: Add WHERE clause with specific conditions

Exit code: 2 (CI/CD blocked)
```

## CI/CD Integration

GitHub Actions:
```yaml
- name: Check agent safety
  run: |
    pip install agentcorrect
    agentcorrect analyze staging_traces.jsonl
```

Any non-zero exit fails the build - standard CI pattern.

## Who Needs This

**Perfect for:**
- Teams with AI agents that call payment APIs (Stripe, Square, etc.)
- Companies using AI for database operations
- Anyone who's had an agent accidentally charge a customer twice
- DevOps teams implementing OWASP guidance on AI agent safety

**Not needed if:**
- Your agents are read-only
- You manually review every agent action
- Your agents don't touch money or data

## Supported Payment Providers

Stripe, PayPal, Square, Adyen, Braintree, Checkout.com, Razorpay, Mollie, Klarna, Afterpay, Mercado Pago, PayU, Paytm, Alipay, WeChat Pay, Coinbase, BitPay, Plaid, Dwolla, Wise, Authorize.net, 2Checkout, WorldPay, Paysafe, BluePay

Each provider's exact idempotency requirements are enforced based on their documentation.

## Why This Is a Painkiller

1. **Prevents real disasters**: Duplicate charges = angry customers + chargebacks
2. **Catches issues in staging**: Before they hit production
3. **Zero false positives**: Only flags actual spec violations
4. **Instant adoption**: Drop into existing CI/CD, no new infrastructure
5. **Vendor-anchored**: Rules come from Stripe/PayPal/Square docs, not opinions

## License

MIT