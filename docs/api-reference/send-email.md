---
id: send-email
title: Send Email
---

**POST** `/v1/emails`

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `from` | string | ✓ | Sender (must be verified domain) |
| `to` | string | ✓ | Recipient |
| `subject` | string | ✓ | Subject line |
| `stream` | string | ✓ | `transactional` / `otp` / `marketing` |
| `html` | string | | HTML body (max 10MB) |
| `text` | string | | Plain text body |
| `cc` | string[] | | CC recipients |
| `bcc` | string[] | | BCC recipients |
| `reply_to` | string[] | | Reply-to addresses |
| `attachments` | object[] | | Base64 files (max 25MB total) |

## Example

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

## Response

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "status": "sent",
  "ses_message_id": "0102018c7b4e5f3a-..."
}
```
