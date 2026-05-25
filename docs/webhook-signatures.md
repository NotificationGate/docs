---
id: webhook-signatures
title: Webhook Signatures
---

Every webhook payload is signed with HMAC-SHA256. Always verify signatures before processing webhook events.

The signature is sent in the `X-Webhook-Signature` header as a hex-encoded digest of the raw request body.

## Node.js

```typescript
import { createHmac, timingSafeEqual } from 'crypto';

function verifyWebhook(rawBody: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  return timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature),
  );
}

// Express example
app.post('/webhooks/email', (req, res) => {
  const signature = req.headers['x-webhook-signature'] as string;
  const isValid = verifyWebhook(req.rawBody, signature, process.env.WEBHOOK_SECRET!);

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body;
  console.log(event.event, event.email_id);
  res.sendStatus(200);
});
```

## Python

```python
import hmac
import hashlib

def verify_webhook(body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


# FastAPI example
from fastapi import Request, HTTPException

@app.post("/webhooks/email")
async def webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("x-webhook-signature", "")

    if not verify_webhook(body, signature, os.environ["WEBHOOK_SECRET"]):
        raise HTTPException(status_code=401, detail="Invalid signature")

    event = await request.json()
    print(event["event"], event["email_id"])
    return {"ok": True}
```

## Go

```go
import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "net/http"
)

func verifyWebhook(body []byte, signature, secret string) bool {
    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write(body)
    expected := hex.EncodeToString(mac.Sum(nil))
    return hmac.Equal([]byte(expected), []byte(signature))
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    body, _ := io.ReadAll(r.Body)
    signature := r.Header.Get("X-Webhook-Signature")

    if !verifyWebhook(body, signature, os.Getenv("WEBHOOK_SECRET")) {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }

    // process event...
    w.WriteHeader(http.StatusOK)
}
```

## Important notes

- Always use the **raw request body** for verification — not a parsed/re-serialized version
- Use a constant-time comparison function (`timingSafeEqual`, `hmac.compare_digest`, `hmac.Equal`) to prevent timing attacks
- Return `200 OK` quickly — if processing takes time, acknowledge the webhook first and process asynchronously
- NotificationGate retries on non-2xx responses (see [Webhooks](/api-reference/webhooks) for retry policy)
