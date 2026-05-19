---
id: nodejs
title: Node.js / TypeScript
---

```bash
npm install @notificationgate/sdk
```

```typescript
import { NotificationGate } from '@notificationgate/sdk';

const ng = new NotificationGate('ng_live_...');

await ng.send({
  from:    'hello@yourdomain.com',
  to:      'user@example.com',
  subject: 'Welcome!',
  stream:  'transactional',
  html:    '<p>Your account is ready.</p>',
});
```

Error handling:

```typescript
import { APIError } from '@notificationgate/sdk';

try {
  await ng.send({ ... });
} catch (err) {
  if (err instanceof APIError) {
    console.log(err.code, err.status);
  }
}
```
