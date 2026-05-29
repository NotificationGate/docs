---
id: bounce-handling
title: Bounce Handling
---

Bounces and spam complaints are processed automatically via AWS SES — no configuration needed.

## What happens automatically

| Event | Action |
|-------|--------|
| Hard bounce | Address suppressed immediately |
| Soft bounce | Logged |
| Spam complaint | Address suppressed immediately |

Hard bounces are permanent delivery failures (address doesn't exist). Soft bounces are temporary (mailbox full, etc.).

## Reputation protection

Sending is automatically paused if your account exceeds:

| Metric | Threshold |
|--------|-----------|
| Bounce rate | > 2.5% |
| Complaint rate | > 0.05% |

These match AWS SES enforcement thresholds. Resume sending from the dashboard after addressing the issue.

## Suppression list

Suppressed addresses appear in your dashboard under **Settings → Suppressions** and via the [Suppressions API](/api-reference/suppressions). You can remove addresses once the underlying issue is resolved.

## Webhook events

If you have a webhook configured, you'll receive events for every bounce and complaint:

```json
{
  "event_type": "email.bounced",
  "email_id": "01234567-89ab-cdef-0123-456789abcdef",
  "recipient": "user@example.com",
  "timestamp": "2026-05-19T10:00:00Z",
  "data": {
    "bounce_type": "hard",
    "reason": "550 5.1.1 The email account does not exist"
  }
}
```

See [Webhooks](/api-reference/webhooks) to register a webhook URL.

## Best practices

- Use `ng_sandbox_` keys in CI/CD to avoid sending to test addresses
- Never re-add hard-bounced addresses
- Validate email addresses before sending to reduce bounce rates
