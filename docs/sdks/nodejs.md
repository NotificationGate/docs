---
id: nodejs
title: Node.js / TypeScript
---

Official Node.js SDK for NotificationGate. Supports TypeScript out of the box.

**GitHub:** [github.com/NotificationGate/sdk-node](https://github.com/NotificationGate/sdk-node)

## Installation

```bash
npm install notificationgate
```

## Initialization

```typescript
import { NotificationGate } from 'notificationgate';

const ng = new NotificationGate('ng_live_...');
```

Use an `ng_sandbox_` key in development and CI to avoid sending real emails.

## Send an email

```typescript
const result = await ng.emails.send({
  from:    'hello@yourdomain.com',
  to:      'user@example.com',
  subject: 'Welcome!',
  stream:  'transactional',
  html:    '<p>Your account is ready.</p>',
  text:    'Your account is ready.',
});

console.log(result.id, result.status);
// 01234567-89ab-cdef-... sent
```

## Batch send

```typescript
const result = await ng.emails.sendBatch({
  emails: [
    {
      from:    'hello@yourdomain.com',
      to:      'alice@example.com',
      subject: 'Welcome, Alice!',
      stream:  'transactional',
      html:    '<p>Hi Alice!</p>',
    },
    {
      from:    'hello@yourdomain.com',
      to:      'bob@example.com',
      subject: 'Welcome, Bob!',
      stream:  'transactional',
      html:    '<p>Hi Bob!</p>',
    },
  ],
});

console.log(`Sent: ${result.sent}, Failed: ${result.failed}`);
```

## Attachments

```typescript
import { readFileSync } from 'fs';

await ng.emails.send({
  from:    'billing@yourdomain.com',
  to:      'user@example.com',
  subject: 'Your invoice',
  stream:  'transactional',
  html:    '<p>Please find your invoice attached.</p>',
  attachments: [
    {
      filename:     'invoice.pdf',
      content_type: 'application/pdf',
      content:      readFileSync('invoice.pdf').toString('base64'),
    },
  ],
});
```

## Error handling

```typescript
import { NotificationGate, APIError } from 'notificationgate';

const ng = new NotificationGate('ng_live_...');

try {
  await ng.emails.send({ ... });
} catch (err) {
  if (err instanceof APIError) {
    console.error(err.code);    // e.g. "domain_not_verified"
    console.error(err.status);  // HTTP status code
    console.error(err.message); // Human-readable message
  }
}
```

## Domain management

```typescript
// Add a domain
const domain = await ng.domains.add('yourdomain.com');

// Verify DKIM records
const status = await ng.domains.verify(domain.id);

// List all domains
const { domains } = await ng.domains.list();

// Remove a domain
await ng.domains.delete(domain.id);
```

## Suppressions

```typescript
// List suppressed addresses
const { suppressions } = await ng.suppressions.list({ limit: 50, search: 'example.com' });

// Remove a suppression
await ng.suppressions.delete('user@example.com');
```
