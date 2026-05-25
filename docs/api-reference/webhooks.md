---
id: webhooks
title: Webhooks
---

Receive real-time delivery events for emails you send. NotificationGate signs every payload with HMAC-SHA256 so you can verify authenticity.

## Register webhook

**POST** `https://notificationgate.com/api/v1/webhooks`

```json
{ "url": "https://yourapp.com/webhooks/email" }
```

**Response:**

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "url": "https://yourapp.com/webhooks/email",
  "secret": "whsec_a8x2kR...",
  "created_at": "2026-05-19T10:00:00Z"
}
```

Store the `secret` securely — it's shown only once and is used to verify payload signatures.

## Events

| Event | When |
|-------|------|
| `email.sent` | Email accepted by SES |
| `email.delivered` | Delivery confirmed by receiving server |
| `email.bounced` | Hard or soft bounce received |
| `email.complained` | Spam complaint received |
| `email.failed` | Sending failed (invalid address, etc.) |

## Payload

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

## Signature verification

All webhook requests include an `X-Webhook-Signature` header containing the HMAC-SHA256 hex digest of the raw request body. See [Webhook Signatures](/webhook-signatures) for verification examples.

## List webhooks

**GET** `https://notificationgate.com/api/v1/webhooks`

## Delete webhook

**DELETE** `https://notificationgate.com/api/v1/webhooks/:id`

## Delivery logs

**GET** `https://notificationgate.com/api/v1/webhooks/logs`

Returns recent delivery attempts with HTTP status codes and response bodies. Useful for debugging failed deliveries.

## Replay failed delivery

**POST** `https://notificationgate.com/api/v1/webhooks/deliveries/:id/replay`

Re-sends a specific webhook delivery. Returns `200 OK` on success.

## Retry policy

Failed deliveries are retried with exponential backoff: 1 min, 5 min, 30 min, 2 hours, 8 hours. After 5 failures the delivery is marked as abandoned.
