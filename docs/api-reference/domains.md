---
id: domains
title: Domains
---

Manage sending domains via the API. All domain operations require a live API key.

## Add domain

**POST** `https://notificationgate.com/api/v1/domains`

```json
{ "domain": "yourdomain.com" }
```

**Response:**

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "domain": "yourdomain.com",
  "status": "pending",
  "dkim_tokens": [
    {
      "name": "token1._domainkey.yourdomain.com",
      "type": "CNAME",
      "value": "token1.dkim.amazonses.com"
    },
    {
      "name": "token2._domainkey.yourdomain.com",
      "type": "CNAME",
      "value": "token2.dkim.amazonses.com"
    },
    {
      "name": "token3._domainkey.yourdomain.com",
      "type": "CNAME",
      "value": "token3.dkim.amazonses.com"
    }
  ]
}
```

Add all 3 CNAME records to your DNS provider, then call verify.

## Verify domain

**GET** `https://notificationgate.com/api/v1/domains/:id/verify`

Triggers a DNS check. Returns updated status.

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "domain": "yourdomain.com",
  "status": "verified"
}
```

| Status | Meaning |
|--------|---------|
| `pending` | CNAME records not yet detected |
| `verified` | DKIM configured, ready to send |
| `failed` | Verification failed — check your DNS records |

## List domains

**GET** `https://notificationgate.com/api/v1/domains`

```json
{
  "domains": [
    {
      "id": "01234567-89ab-cdef-0123-456789abcdef",
      "domain": "yourdomain.com",
      "status": "verified",
      "created_at": "2026-05-19T10:00:00Z"
    }
  ]
}
```

## Remove domain

**DELETE** `https://notificationgate.com/api/v1/domains/:id`

Returns `204 No Content` on success. Emails from this domain will fail after deletion.
