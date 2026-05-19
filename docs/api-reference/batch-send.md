---
id: batch-send
title: Batch Send
---

**POST** `/v1/emails/batch`

Send up to 100 emails in one request. Each email is processed independently — one failure doesn't stop others.

## Request body

```json
{
  "emails": [
    { "from": "...", "to": "a@example.com", "subject": "...", "stream": "transactional", "html": "..." },
    { "from": "...", "to": "b@example.com", "subject": "...", "stream": "transactional", "html": "..." }
  ]
}
```

## Response

```json
{
  "results": [
    { "index": 0, "message_id": "ses_xxx", "status": "sent" },
    { "index": 1, "error": "address_suppressed", "status": "failed" }
  ],
  "sent": 1,
  "failed": 1
}
```
