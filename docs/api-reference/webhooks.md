---
id: webhooks
title: Webhooks
---

## Register webhook

**POST** `/v1/webhooks`

```json
{ "url": "https://yourapp.com/webhooks/email" }
```

Returns a signing secret — verify request signatures with it.

## Events

| Event | When |
|-------|------|
| `email.bounced` | Hard or soft bounce |
| `email.complained` | Spam complaint |
| `email.delivered` | Confirmed delivery |

## Payload example

```json
{
  "event": "email.bounced",
  "email_id": "...",
  "recipient": "user@example.com",
  "timestamp": "2026-05-19T10:00:00Z"
}
```

## Signature verification

All payloads are HMAC-SHA256 signed. Check the `X-Webhook-Signature` header.

## Delivery logs

**GET** `/v1/webhooks/logs`

## Replay failed delivery

**POST** `/v1/webhooks/deliveries/:id/replay`
