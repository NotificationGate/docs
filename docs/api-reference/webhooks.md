---
id: webhooks
title: Webhooks
---

Receive real-time delivery events. Every payload is signed with HMAC-SHA256 — see [Webhook Signatures](/webhook-signatures).

## Register

**POST** `/v1/webhooks`

```json
{ "url": "https://yourapp.com/webhooks/email" }
```

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "url": "https://yourapp.com/webhooks/email",
  "secret": "whsec_a8x2kR...",
  "created_at": "2026-05-19T10:00:00Z"
}
```

Store the `secret` securely — shown only once.

## Events

| event_type | When |
|------------|------|
| `email.bounced` | Hard or soft bounce received from SES |
| `email.complained` | Spam complaint received from SES |

## Payload

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

```json
{
  "event_type": "email.complained",
  "email_id": "01234567-89ab-cdef-0123-456789abcdef",
  "recipient": "user@example.com",
  "timestamp": "2026-05-19T10:00:00Z",
  "data": {}
}
```

## Get webhook

**GET** `/v1/webhooks`

## Delete webhook

**DELETE** `/v1/webhooks`

Returns `204 No Content`.

## Delivery logs

**GET** `/v1/webhooks/logs`

Returns recent delivery attempts with HTTP status code and response body.

| Param | Default | Description |
|-------|---------|-------------|
| `limit` | 50 | Max results (max 100) |
| `offset` | 0 | Pagination offset |

## Replay a delivery

**POST** `/v1/webhooks/deliveries/:id/replay`

Re-queues a specific delivery. Returns `202 Accepted`.

## Test

**POST** `/v1/webhooks/test`

Sends a test event to your webhook URL and returns the HTTP status and response time.

## Retry policy

Failed deliveries are retried with exponential backoff: **1 min → 5 min → 30 min → 2 hours**. After 4 failures the delivery is abandoned.
