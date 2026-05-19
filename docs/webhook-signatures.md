---
id: webhook-signatures
title: Webhook Signatures
---

Every webhook payload is signed with HMAC-SHA256.

## Verify in Node.js

```typescript
import { createHmac } from 'crypto';

function verifyWebhook(body: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(body).digest('hex');
  return expected === signature;
}

// In your handler:
const signature = req.headers['x-webhook-signature'];
const isValid = verifyWebhook(req.rawBody, signature, process.env.WEBHOOK_SECRET);
```

## Verify in Python

```python
import hmac, hashlib

def verify_webhook(body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)
```
