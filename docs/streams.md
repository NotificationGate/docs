---
id: streams
title: Email Streams
---

Every email must specify a `stream`. Each runs on isolated IP pools.

| Stream | Use case |
|--------|----------|
| `transactional` | Password resets, receipts, invoices |
| `otp` | 2FA codes, verification |
| `marketing` | Newsletters, campaigns |

Marketing emails auto-include `List-Unsubscribe` headers (RFC 8058).
