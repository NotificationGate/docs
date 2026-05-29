---
id: webhook-signatures
title: Webhook Signatures
---

Every webhook payload is signed with HMAC-SHA256. Verify the signature before processing events.

The signature is in the `X-Webhook-Signature` header as a hex-encoded digest of the raw request body.

## Node.js

```typescript
import { createHmac, timingSafeEqual } from 'crypto';

function verifyWebhook(rawBody: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

app.post('/webhooks/email', (req, res) => {
  const sig = req.headers['x-webhook-signature'] as string;
  if (!verifyWebhook(req.rawBody, sig, process.env.WEBHOOK_SECRET!)) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body;
  console.log(event.event_type, event.email_id);
  res.sendStatus(200);
});
```

## Python

```python
import hmac, hashlib

def verify_webhook(body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)

@app.post("/webhooks/email")
async def webhook(request: Request):
    body = await request.body()
    sig = request.headers.get("x-webhook-signature", "")
    if not verify_webhook(body, sig, os.environ["WEBHOOK_SECRET"]):
        raise HTTPException(status_code=401)

    event = await request.json()
    print(event["event_type"], event["email_id"])
    return {"ok": True}
```

## Go

```go
func verifyWebhook(body []byte, signature, secret string) bool {
    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write(body)
    expected := hex.EncodeToString(mac.Sum(nil))
    return hmac.Equal([]byte(expected), []byte(signature))
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    body, _ := io.ReadAll(r.Body)
    if !verifyWebhook(body, r.Header.Get("X-Webhook-Signature"), os.Getenv("WEBHOOK_SECRET")) {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }
    // process event...
    w.WriteHeader(http.StatusOK)
}
```

## Notes

- Always verify against the **raw request body** — not parsed/re-serialized JSON
- Use constant-time comparison (`timingSafeEqual`, `hmac.compare_digest`, `hmac.Equal`) to prevent timing attacks
- Acknowledge with `200 OK` quickly; process asynchronously if needed
- NotificationGate retries on non-2xx responses — see [retry policy](/api-reference/webhooks#retry-policy)
