---
id: bounce-handling
title: Bounce Handling
---

NotificationGate automatically processes bounces and spam complaints from AWS SES via SNS. No configuration needed.

## What happens automatically

| Event | Action |
|-------|--------|
| Hard bounce | Address suppressed immediately |
| Soft bounce | Logged and retried after 30 minutes |
| Spam complaint | Address suppressed immediately |

Hard bounces indicate permanent delivery failures (e.g. address doesn't exist). Soft bounces are temporary (e.g. mailbox full).

## Reputation protection

If your account exceeds safe thresholds, sending is automatically paused to protect your domain reputation:

| Metric | Threshold | Action |
|--------|-----------|--------|
| Bounce rate | > 2.5% | Sending paused, you are notified |
| Complaint rate | > 0.05% | Sending paused, you are notified |

These match AWS SES enforcement thresholds. Exceeding them without intervention risks SES account suspension.

## Suppression list

Suppressed addresses are visible in your dashboard under **Settings → Suppressions** and accessible via the [Suppressions API](/api-reference/suppressions).

You can remove individual addresses from the suppression list once the underlying issue has been resolved (e.g. the recipient fixed their mailbox).

## Webhook events

You receive real-time events for every bounce and complaint:

```json
{
  "event": "email.bounced",
  "email_id": "01234567-89ab-cdef-0123-456789abcdef",
  "recipient": "user@example.com",
  "stream": "transactional",
  "timestamp": "2026-05-19T10:00:00Z",
  "data": {
    "bounce_type": "Permanent",
    "bounce_subtype": "General"
  }
}
```

Set up webhooks in your dashboard under **Settings → Webhooks** or via the [Webhooks API](/api-reference/webhooks).

## Best practices

- Monitor your bounce rate in the **Analytics** dashboard
- Use `ng_sandbox_` keys in CI/CD to avoid sending to test addresses
- Never re-add hard-bounced addresses — they are bouncing for a reason
- Validate email addresses before sending to reduce bounce rates
