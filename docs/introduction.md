---
id: introduction
title: Introduction
slug: /
---

## What is NotificationGate?

NotificationGate lets you send transactional, OTP, and marketing emails through a single REST API — without touching AWS. We handle SES setup, DKIM verification, bounce handling, and suppression lists.

**Why NotificationGate?**

- **4× cheaper than Resend** — AWS SES pricing, our simplicity
- **3 isolated streams** — Transactional, OTP, Marketing on separate IP pools  
- **No AWS setup** — Domain verification in 5 minutes
- **Sandbox mode** — Test without sending real emails

## Quick start

```bash
curl https://api.notificationgate.com/v1/emails \
  -H "Authorization: Bearer ng_live_..." \
  -H "Content-Type: application/json" \
  -d '{"from":"hello@yourdomain.com","to":"user@example.com","subject":"Hi","stream":"transactional","html":"<p>Hello!</p>"}'
```
