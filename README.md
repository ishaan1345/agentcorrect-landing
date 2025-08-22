# AgentCorrect 🛡️

**95% Detection Rate** - Stop AI agents from double-charging customers and destroying databases.

## What It Catches

### ✅ Payment Issues (95%+ detection)
- Missing idempotency keys for 25+ payment providers
- Invalid idempotency keys (empty, "test", timestamps)
- Subdomain spoofing (api.stripe.com.evil.com)
- GraphQL payment mutations
- Webhook-triggered payments
- Same key used for different amounts

### ✅ SQL Disasters (100% detection)
- DELETE without WHERE
- UPDATE without WHERE
- DROP TABLE/DATABASE
- TRUNCATE operations
- Tautologies (WHERE 1=1, WHERE id=id)
- SQL comment bypasses

### ✅ Infrastructure Nukes (100% detection)
- MongoDB dropDatabase/drop operations
- Redis FLUSHALL/FLUSHDB
- S3 DeleteBucket

## Quick Start

```bash
pip install agentcorrect
agentcorrect analyze trace.jsonl
```

## Installation

```bash
git clone https://github.com/ishaan1345/agentcorrect
cd agentcorrect
pip install -e .
```

## Usage

Analyze agent traces:
```bash
agentcorrect analyze traces.jsonl --out results/
```

Demo mode:
```bash
agentcorrect demo --scenario all
```

## Exit Codes

- 0: Clean (no issues or only warnings)
- 2: SEV0 issues found (blocks CI/CD)
- 4: Input error
- 5: Policy compilation error

## Supported Providers

Stripe, PayPal, Square, Adyen, Braintree, Checkout.com, Razorpay, Mollie, Klarna, Afterpay, Mercado Pago, PayU, Paytm, Alipay, WeChat Pay, Coinbase, BitPay, Plaid, Dwolla, Wise, Authorize.net, 2Checkout, WorldPay, Paysafe, BluePay

## Performance

- <100ms per trace
- No network calls (fully offline)
- Deterministic results
- Memory efficient

## License

MIT