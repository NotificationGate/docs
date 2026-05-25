---
id: quickstart
title: Quickstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Send your first email in under 5 minutes.

## 1. Create an account

Sign up at [notificationgate.com](https://notificationgate.com) — free, no credit card required. The free plan includes 3,000 emails/month.

## 2. Add your domain

Go to **Domains** in your dashboard and enter your sending domain (e.g. `yourdomain.com`). You'll receive 3 CNAME records to add to your DNS provider for DKIM verification.

See [Domain Setup](/domain-setup) for detailed instructions.

## 3. Get an API key

Go to **Settings → API Keys** → Create new key. Copy it — it's shown only once.

| Key type | Prefix | Behavior |
|----------|--------|----------|
| Live | `ng_live_` | Sends real emails |
| Sandbox | `ng_sandbox_` | Returns `status: sandbox`, no real sending |

## 4. Send your first email

<Tabs>
<TabItem value="curl" label="cURL">

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

</TabItem>
<TabItem value="nodejs" label="Node.js">

```bash
npm install notificationgate
```

```typescript
import { NotificationGate } from 'notificationgate';

const ng = new NotificationGate('ng_live_...');

const result = await ng.emails.send({
  from:    'hello@yourdomain.com',
  to:      'user@example.com',
  subject: 'Welcome!',
  stream:  'transactional',
  html:    '<p>Your account is ready.</p>',
});

console.log(result.id, result.status);
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install notificationgate
```

```python
from notificationgate import NotificationGate

ng = NotificationGate("ng_live_...")

result = ng.emails.send(
    from_="hello@yourdomain.com",
    to="user@example.com",
    subject="Welcome!",
    stream="transactional",
    html="<p>Your account is ready.</p>",
)

print(result.id, result.status)
```

</TabItem>
<TabItem value="go" label="Go">

```bash
go get github.com/NotificationGate/sdk-go
```

```go
import ng "github.com/NotificationGate/sdk-go"

client := ng.New("ng_live_...")

result, err := client.Emails.Send(ctx, ng.SendEmailRequest{
    From:    "hello@yourdomain.com",
    To:      "user@example.com",
    Subject: "Welcome!",
    Stream:  "transactional",
    HTML:    "<p>Your account is ready.</p>",
})
if err != nil {
    log.Fatal(err)
}
fmt.Println(result.ID, result.Status)
```

</TabItem>
</Tabs>

## Response

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "status": "sent",
  "ses_message_id": "0102018c7b4e5f3a-..."
}
```

## 5. Check delivery status

Open **Email Logs** in your dashboard to see real-time delivery status, bounce events, and complaints.

## Next steps

- [Authentication](/authentication) — API key types and best practices
- [Email Streams](/streams) — When to use transactional vs OTP vs marketing
- [Domain Setup](/domain-setup) — DKIM, SPF, and DMARC setup
- [Bounce Handling](/bounce-handling) — How bounces are managed automatically
