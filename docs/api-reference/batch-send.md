---
id: batch-send
title: Batch Send
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**POST** `https://notificationgate.com/api/v1/emails/batch`

Send up to 100 emails in a single request. Each email is processed independently — one failure does not block the others.

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `emails` | object[] | yes | Array of email objects (max 100) |

Each object in `emails` accepts the same fields as the [Send Email](/api-reference/send-email) endpoint.

## Examples

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl https://notificationgate.com/api/v1/emails/batch \
  -H "Authorization: Bearer ng_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "emails": [
      {
        "from":    "hello@yourdomain.com",
        "to":      "alice@example.com",
        "subject": "Welcome, Alice!",
        "stream":  "transactional",
        "html":    "<p>Hi Alice, welcome aboard!</p>"
      },
      {
        "from":    "hello@yourdomain.com",
        "to":      "bob@example.com",
        "subject": "Welcome, Bob!",
        "stream":  "transactional",
        "html":    "<p>Hi Bob, welcome aboard!</p>"
      }
    ]
  }'
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```typescript
import { NotificationGate } from 'notificationgate';

const ng = new NotificationGate('ng_live_...');

const result = await ng.emails.sendBatch({
  emails: [
    {
      from:    'hello@yourdomain.com',
      to:      'alice@example.com',
      subject: 'Welcome, Alice!',
      stream:  'transactional',
      html:    '<p>Hi Alice, welcome aboard!</p>',
    },
    {
      from:    'hello@yourdomain.com',
      to:      'bob@example.com',
      subject: 'Welcome, Bob!',
      stream:  'transactional',
      html:    '<p>Hi Bob, welcome aboard!</p>',
    },
  ],
});

console.log(`Sent: ${result.sent}, Failed: ${result.failed}`);
```

</TabItem>
<TabItem value="python" label="Python">

```python
from notificationgate import NotificationGate

ng = NotificationGate("ng_live_...")

result = ng.emails.send_batch(emails=[
    {
        "from_": "hello@yourdomain.com",
        "to": "alice@example.com",
        "subject": "Welcome, Alice!",
        "stream": "transactional",
        "html": "<p>Hi Alice, welcome aboard!</p>",
    },
    {
        "from_": "hello@yourdomain.com",
        "to": "bob@example.com",
        "subject": "Welcome, Bob!",
        "stream": "transactional",
        "html": "<p>Hi Bob, welcome aboard!</p>",
    },
])

print(f"Sent: {result.sent}, Failed: {result.failed}")
```

</TabItem>
<TabItem value="go" label="Go">

```go
import ng "github.com/NotificationGate/sdk-go"

client := ng.New("ng_live_...")

result, err := client.Emails.SendBatch(ctx, ng.BatchSendRequest{
    Emails: []ng.SendEmailRequest{
        {
            From:    "hello@yourdomain.com",
            To:      "alice@example.com",
            Subject: "Welcome, Alice!",
            Stream:  "transactional",
            HTML:    "<p>Hi Alice, welcome aboard!</p>",
        },
        {
            From:    "hello@yourdomain.com",
            To:      "bob@example.com",
            Subject: "Welcome, Bob!",
            Stream:  "transactional",
            HTML:    "<p>Hi Bob, welcome aboard!</p>",
        },
    },
})
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Sent: %d, Failed: %d\n", result.Sent, result.Failed)
```

</TabItem>
</Tabs>

## Response

```json
{
  "results": [
    {
      "index": 0,
      "id": "01234567-89ab-cdef-0123-456789abcdef",
      "ses_message_id": "0102018c7b4e5f3a-...",
      "status": "sent"
    },
    {
      "index": 1,
      "error": "address_suppressed",
      "status": "failed"
    }
  ],
  "sent": 1,
  "failed": 1
}
```

| Field | Description |
|-------|-------------|
| `results` | Per-email outcome in request order |
| `results[].index` | Position in the request array (0-based) |
| `results[].id` | NotificationGate email UUID (on success) |
| `results[].error` | Error code (on failure) |
| `results[].status` | `sent`, `queued`, `sandbox`, or `failed` |
| `sent` | Total successfully sent |
| `failed` | Total failed |

## Limits

- Maximum 100 emails per batch request
- Total request body max 10 MB
- Each email still counts against your plan quota
