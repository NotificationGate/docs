---
id: streams
title: Email Streams
---

Every email must specify a `stream`. Each stream runs on isolated IP pools, so reputation issues in one stream never affect another.

## Available streams

| Stream | Use case | IP pool |
|--------|----------|---------|
| `transactional` | Password resets, receipts, invoices, notifications | Dedicated transactional IPs |
| `otp` | 2FA codes, magic links, email verification | Dedicated OTP IPs |
| `marketing` | Newsletters, campaigns, announcements | Dedicated marketing IPs |

## Why stream isolation matters

Email deliverability depends heavily on IP reputation. A marketing campaign that generates spam complaints would normally hurt your password reset deliverability — not with NotificationGate.

Each stream has its own IP pool. Complaints on marketing emails never affect transactional or OTP delivery.

## Choosing the right stream

**Use `transactional`** for emails triggered by a user action: account confirmations, purchase receipts, shipping notifications, password resets.

**Use `otp`** for time-sensitive authentication emails: one-time passwords, login codes, magic links. OTP IPs are reserved exclusively for these flows to maximize inbox placement.

**Use `marketing`** for bulk or scheduled emails not triggered by a direct user action: newsletters, product announcements, re-engagement campaigns.

## List-Unsubscribe headers

Marketing emails automatically include `List-Unsubscribe` and `List-Unsubscribe-Post` headers per RFC 8058. This is required by Gmail and Yahoo for bulk senders and reduces spam complaints.

Transactional and OTP emails do not include these headers.

## Bounce rate limits

If bounce or complaint rates exceed safe thresholds, sending is paused automatically:

| Metric | Threshold | Action |
|--------|-----------|--------|
| Bounce rate | > 2.5% | Sending paused |
| Complaint rate | > 0.05% | Sending paused |

You'll be notified via webhook and email. Resume sending from the dashboard after addressing the issue.
