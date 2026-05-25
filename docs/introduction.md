---
id: introduction
title: Introduction
slug: /
---

## What is NotificationGate?

NotificationGate is a transactional email API built on AWS SES. Send password resets, OTP codes, and marketing campaigns through a single REST API — without any AWS setup.

We handle SES configuration, DKIM verification, bounce suppression, and reputation protection. Your domain is live in under 5 minutes.

**Why NotificationGate?**

- **4x cheaper than Resend** — built directly on AWS SES pricing
- **3 isolated IP streams** — transactional, OTP, and marketing on separate IP pools
- **No AWS account needed** — we provision everything for you
- **Automatic bounce handling** — hard bounces and complaints auto-suppressed
- **Sandbox mode** — test without sending real emails, safe for CI/CD

## Base URL

```
https://notificationgate.com/api
```

All API endpoints are prefixed with `/v1`.

## Email streams

Every email belongs to one of three isolated streams:

| Stream | Use case | IP pool |
|--------|----------|---------|
| `transactional` | Password resets, receipts, invoices | Dedicated transactional IPs |
| `otp` | 2FA codes, magic links, verification | Dedicated OTP IPs |
| `marketing` | Newsletters, campaigns | Dedicated marketing IPs |

Stream isolation means a spike in marketing bounces can never affect your transactional deliverability.

## Pricing

| Plan | Price | Emails/month |
|------|-------|--------------|
| Free | $0 | 3,000 |
| Starter | $19/mo | 50,000 |
| Growth | $49/mo | 200,000 |
| Scale | $99/mo | 1,000,000 |

## SDKs

Official SDKs available for:

- **Node.js / TypeScript** — [`npm install notificationgate`](https://github.com/NotificationGate/sdk-node)
- **Python** — [`pip install notificationgate`](https://github.com/NotificationGate/sdk-python)
- **Go** — [`go get github.com/NotificationGate/sdk-go`](https://github.com/NotificationGate/sdk-go)

## Quick example

```bash
curl https://notificationgate.com/api/v1/emails \
  -H "Authorization: Bearer ng_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "from":    "hello@yourdomain.com",
    "to":      "user@example.com",
    "subject": "Welcome!",
    "stream":  "transactional",
    "html":    "<p>Your account is ready.</p>"
  }'
```

Get started in the [Quickstart](/quickstart) guide or sign up at [notificationgate.com](https://notificationgate.com).
