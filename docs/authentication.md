---
id: authentication
title: Authentication
---

All API requests require a Bearer token in the `Authorization` header.

```
Authorization: Bearer ng_live_a8x2kR...
```

## API key types

| Type | Prefix | Behavior |
|------|--------|----------|
| Live | `ng_live_` | Sends real emails via AWS SES |
| Sandbox | `ng_sandbox_` | Returns `status: sandbox`, no real sending |

Use sandbox keys in development and CI/CD pipelines — emails are validated but never delivered.

## Getting an API key

1. Sign in at [notificationgate.com](https://notificationgate.com)
2. Go to **Settings → API Keys**
3. Click **Create new key**
4. Copy the key immediately — it is shown only once

## Security best practices

- Store keys in environment variables, never in source code
- Use separate keys per environment (staging, production)
- Rotate keys immediately if compromised — delete from the dashboard and create a new one
- Sandbox keys are safe to use in automated tests

## Error responses

| Status | Code | Meaning |
|--------|------|---------|
| `401` | `unauthorized` | Missing or invalid API key |
| `403` | `forbidden` | Key lacks permission for this action |
| `429` | `rate_limited` | Too many requests |

```json
{
  "error": "unauthorized",
  "message": "Invalid API key"
}
```
