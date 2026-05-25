---
id: send-email
title: Send Email
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**POST** `https://notificationgate.com/api/v1/emails`

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `from` | string | yes | Sender address — must be a verified domain |
| `to` | string | yes | Recipient email address |
| `subject` | string | yes | Email subject line |
| `stream` | string | yes | `transactional`, `otp`, or `marketing` |
| `html` | string | | HTML body (max 10 MB) |
| `text` | string | | Plain text body |
| `cc` | string[] | | CC recipients |
| `bcc` | string[] | | BCC recipients |
| `reply_to` | string[] | | Reply-to addresses |
| `attachments` | object[] | | Base64-encoded files (max 25 MB total) |

At least one of `html` or `text` is required.

## Examples

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://notificationgate.com/api/v1/emails \
  -H "Authorization: Bearer ng_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "from":    "hello@yourdomain.com",
    "to":      "user@example.com",
    "subject": "Welcome to Acme!",
    "stream":  "transactional",
    "html":    "<p>Your account is ready. <a href=\"https://acme.com/login\">Sign in</a></p>",
    "text":    "Your account is ready. Sign in at https://acme.com/login"
  }'
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```typescript
import { NotificationGate } from 'notificationgate';

const ng = new NotificationGate('ng_live_...');

const result = await ng.emails.send({
  from:    'hello@yourdomain.com',
  to:      'user@example.com',
  subject: 'Welcome to Acme!',
  stream:  'transactional',
  html:    '<p>Your account is ready. <a href="https://acme.com/login">Sign in</a></p>',
  text:    'Your account is ready. Sign in at https://acme.com/login',
});

console.log(result.id); // UUID
```

</TabItem>
<TabItem value="python" label="Python">

```python
from notificationgate import NotificationGate

ng = NotificationGate("ng_live_...")

result = ng.emails.send(
    from_="hello@yourdomain.com",
    to="user@example.com",
    subject="Welcome to Acme!",
    stream="transactional",
    html="<p>Your account is ready.</p>",
    text="Your account is ready.",
)

print(result.id)
```

</TabItem>
<TabItem value="go" label="Go">

```go
import ng "github.com/NotificationGate/sdk-go"

client := ng.New("ng_live_...")

result, err := client.Emails.Send(ctx, ng.SendEmailRequest{
    From:    "hello@yourdomain.com",
    To:      "user@example.com",
    Subject: "Welcome to Acme!",
    Stream:  "transactional",
    HTML:    "<p>Your account is ready.</p>",
    Text:    "Your account is ready.",
})
if err != nil {
    log.Fatal(err)
}
fmt.Println(result.ID)
```

</TabItem>
</Tabs>

## Response

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "status": "sent",
  "ses_message_id": "0102018c7b4e5f3a-29d0c4a6-b2e3-4f1a-9d8c-56e7f8a9b0c1-000000"
}
```

| Field | Description |
|-------|-------------|
| `id` | NotificationGate email UUID — use this to look up the email in logs |
| `status` | `sent`, `queued`, or `sandbox` |
| `ses_message_id` | AWS SES message ID (present when status is `sent`) |

## Attachments

```json
{
  "from": "billing@yourdomain.com",
  "to": "user@example.com",
  "subject": "Your invoice",
  "stream": "transactional",
  "html": "<p>Please find your invoice attached.</p>",
  "attachments": [
    {
      "filename": "invoice-2026-05.pdf",
      "content_type": "application/pdf",
      "content": "<base64-encoded-content>"
    }
  ]
}
```

## Error responses

```json
{
  "error": "domain_not_verified",
  "message": "The sending domain has not been verified"
}
```

| Code | Status | Meaning |
|------|--------|---------|
| `domain_not_verified` | 422 | `from` domain not verified |
| `address_suppressed` | 422 | Recipient is on suppression list |
| `invalid_stream` | 422 | Unknown stream value |
| `rate_limited` | 429 | Too many requests |
