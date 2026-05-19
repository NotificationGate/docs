---
id: domains
title: Domains
---

## Add domain

**POST** `/v1/domains`

```json
{ "domain": "yourdomain.com" }
```

Returns 3 CNAME records to add to your DNS for DKIM verification.

## Verify domain

**GET** `/v1/domains/:id/verify`

Check if DNS records are propagated.

## List domains

**GET** `/v1/domains`

## Remove domain

**DELETE** `/v1/domains/:id`
