---
id: quickstart
title: Quickstart
---

## 1. Create account

Sign up at [app.notificationgate.com](https://app.notificationgate.com/signup) — free, no credit card.

## 2. Add your domain

Go to **Domains** → add your domain → copy the 3 CNAME records to your DNS.

## 3. Get an API key

Go to **API Keys** → create → copy the key (shown once).

## 4. Send your first email

```bash
curl https://api.notificationgate.com/v1/emails \
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

**Response:**
```json
{ "id": "...", "status": "sent", "ses_message_id": "..." }
```

Check **Email Logs** in your dashboard to see delivery status.
